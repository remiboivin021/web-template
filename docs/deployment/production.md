# Production Deployment

Guide for deploying the Web Template to production environments.

## Prerequisites

- Production server (VPS, cloud instance, etc.)
- Domain name (optional but recommended)
- SSL/TLS certificate
- Docker and Docker Compose installed
- Firewall configured

## Deployment Options

### 1. Docker Compose (Simple)
Best for: Small to medium applications, single server

### 2. Docker Swarm (Medium)
Best for: Multi-node deployments, high availability

### 3. Kubernetes (Complex)
Best for: Large-scale applications, complex orchestration

This guide focuses on **Docker Compose** deployment.

## Server Setup

### System Requirements

- **CPU:** 2+ cores
- **RAM:** 4GB+ minimum, 8GB+ recommended
- **Disk:** 20GB+ SSD
- **OS:** Ubuntu 22.04 LTS (recommended) or similar

### Install Docker

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

## Production Configuration

### 1. Environment Variables

Create `.env` file with production values:

```bash
# Server Configuration
PORT=3001
NODE_ENV=production

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webtemplate
DB_USER=postgres
DB_PASSWORD=<STRONG_PASSWORD_HERE>

# Security
SESSION_SECRET=<RANDOM_SECRET_HERE>
```

**Generate secure passwords:**
```bash
# Generate random password
openssl rand -base64 32
```

### 2. Docker Compose Override

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  postgres:
    restart: always
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups

  web:
    restart: always
    environment:
      - NODE_ENV=production
      - DB_PASSWORD=${DB_PASSWORD}
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - web

volumes:
  postgres_data:
```

### 3. Nginx Configuration

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    upstream backend {
        server web:3001;
    }

    upstream frontend {
        server web:3000;
    }

    # HTTP -> HTTPS redirect
    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000" always;

        # API proxy
        location /api {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Frontend proxy
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

## SSL/TLS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./ssl/key.pem

# Set up auto-renewal
sudo certbot renew --dry-run
```

### Certificate Renewal

Add to crontab:
```bash
0 0 * * * certbot renew --quiet && docker compose restart nginx
```

## Deployment Process

### Initial Deployment

```bash
# 1. Clone repository
git clone https://github.com/remiboivin021/web-template.git
cd web-template

# 2. Configure environment
cp .env.example .env
nano .env  # Edit with production values

# 3. Create SSL directory
mkdir ssl
# Copy SSL certificates to ./ssl/

# 4. Start services
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 5. Verify deployment
docker compose ps
curl https://your-domain.com/api/health
```

### Updates and Rollouts

```bash
# 1. Pull latest code
git pull origin main

# 2. Rebuild containers
docker compose -f docker-compose.yml -f docker-compose.prod.yml build

# 3. Rolling update (minimal downtime)
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps web

# 4. Verify
curl https://your-domain.com/api/health
```

## Backup Strategy

### Database Backups

Create `backup.sh`:
```bash
#!/bin/bash
BACKUP_DIR=/backups
DATE=$(date +%Y%m%d_%H%M%S)
docker compose exec -T postgres pg_dump -U postgres webtemplate > $BACKUP_DIR/backup_$DATE.sql
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

### Automated Backups

Add to crontab:
```bash
0 2 * * * /path/to/backup.sh
```

### Restore from Backup

```bash
# Stop application
docker compose stop web

# Restore database
gunzip -c backup_20260108.sql.gz | docker compose exec -T postgres psql -U postgres webtemplate

# Restart application
docker compose start web
```

## Monitoring

### Application Logs

```bash
# View logs
docker compose logs -f web

# Export logs
docker compose logs --no-color > app.log
```

### Log Rotation

Configure Docker logging:
```yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Health Monitoring

Set up monitoring with:
- **Prometheus** - Metrics collection
- **Grafana** - Visualization
- **Uptime Robot** - External monitoring

Simple health check script:
```bash
#!/bin/bash
if ! curl -f https://your-domain.com/api/health > /dev/null 2>&1; then
  echo "Health check failed!" | mail -s "Alert: App Down" admin@example.com
fi
```

## Security Hardening

### 1. Firewall Configuration

```bash
# Install UFW
sudo apt install ufw

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Secure Docker Daemon

```bash
# Edit /etc/docker/daemon.json
{
  "icc": false,
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}

# Restart Docker
sudo systemctl restart docker
```

### 3. Regular Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker compose pull
docker compose up -d
```

### 4. Security Scanning

```bash
# Scan images for vulnerabilities
docker scan web-template-app:latest
```

## Performance Optimization

### 1. PostgreSQL Tuning

Add to `docker-compose.prod.yml`:
```yaml
postgres:
  command:
    - "postgres"
    - "-c"
    - "shared_buffers=256MB"
    - "-c"
    - "effective_cache_size=1GB"
    - "-c"
    - "max_connections=100"
```

### 2. Node.js Optimization

```yaml
web:
  environment:
    - NODE_ENV=production
    - NODE_OPTIONS=--max-old-space-size=2048
```

### 3. Enable Caching

Add Redis for caching:
```yaml
redis:
  image: redis:alpine
  restart: always
```

## Scaling

### Horizontal Scaling

```yaml
services:
  web:
    deploy:
      replicas: 3
```

### Load Balancing

Use Nginx upstream:
```nginx
upstream backend {
  least_conn;
  server web-1:3001;
  server web-2:3001;
  server web-3:3001;
}
```

## Troubleshooting

### Check Service Status

```bash
docker compose ps
docker compose logs web
systemctl status docker
```

### Database Issues

```bash
# Check PostgreSQL logs
docker compose logs postgres

# Check connections
docker compose exec postgres psql -U postgres -c "SELECT * FROM pg_stat_activity;"
```

### Performance Issues

```bash
# Check resource usage
docker stats

# Check system resources
htop
df -h
```

## Production Checklist

- [ ] Strong passwords configured
- [ ] SSL/TLS certificates installed
- [ ] Firewall configured
- [ ] Automated backups set up
- [ ] Monitoring enabled
- [ ] Log rotation configured
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Health checks working
- [ ] Domain DNS configured
- [ ] Email alerts set up
- [ ] Documentation updated

## Disaster Recovery

1. **Regular backups** - Database and files
2. **Backup testing** - Verify restore process
3. **Off-site backups** - Store in different location
4. **Documentation** - Keep recovery procedures updated
5. **Monitoring** - Alert on failures

## Next Steps

- Set up CI/CD pipeline
- Implement application monitoring
- Configure CDN for static assets
- Set up staging environment
- Implement blue-green deployments
