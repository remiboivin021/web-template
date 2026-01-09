# Container Diagram

**Last Updated:** [Date]  
**Status:** [Draft | Active | Deprecated]  
**Owner:** [Team/Person]

## Overview

[Describe the high-level architecture and the key containers that make up the system]

## Diagram

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

LAYOUT_WITH_LEGEND()

title Container Diagram for [Your System Name]

Person(user, "[User Type]", "[User description]")
Person_Ext(admin, "[Admin Type]", "[Admin description]")

System_Boundary(systemBoundary, "[Your System Name]") {
    Container(webApp, "[Web Application]", "[Technology Stack]", "[Purpose and responsibilities]")
    
    Container(apiGateway, "[API Gateway]", "[Technology]", "[Purpose]")
    
    Container(service1, "[Service 1]", "[Technology Stack]", "[Service responsibilities]")
    Container(service2, "[Service 2]", "[Technology Stack]", "[Service responsibilities]")
    
    ContainerDb(database1, "[Database 1]", "[Database Technology]", "[What data is stored]")
    ContainerDb(database2, "[Database 2]", "[Database Technology]", "[What data is stored]")
    
    Container(cache, "[Cache]", "[Cache Technology]", "[Caching strategy]")
    Container(messageQueue, "[Message Queue]", "[Queue Technology]", "[Async communication]")
}

System_Ext(externalSystem, "[External System]", "[Purpose]")

' Relationships
Rel(user, webApp, "Uses", "HTTPS")
Rel(admin, webApp, "Administers", "HTTPS")

Rel(webApp, apiGateway, "Makes API calls", "HTTPS/JSON")
Rel(apiGateway, service1, "Routes to", "HTTP/REST")
Rel(apiGateway, service2, "Routes to", "HTTP/REST")

Rel(service1, database1, "Reads/Writes", "SQL/TCP")
Rel(service2, database2, "Reads/Writes", "SQL/TCP")

Rel(service1, cache, "Reads/Writes", "Redis Protocol")
Rel(service2, cache, "Reads/Writes", "Redis Protocol")

Rel(service1, messageQueue, "Publishes events", "AMQP")
Rel(service2, messageQueue, "Subscribes to events", "AMQP")

Rel(service1, externalSystem, "Integrates with", "HTTPS/REST")

@enduml
```

## Containers

### [Container 1 Name]

**Type:** [Web Application | API | Service | Database | etc.]  
**Technology Stack:**
- Language: [e.g., TypeScript]
- Framework: [e.g., React 18]
- Build Tool: [e.g., Vite]
- Key Libraries: [e.g., React Query, Zustand]

**Purpose:**
[Describe what this container does and why it exists]

**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

**Exposed Interfaces:**
- [API endpoints, webhooks, UI, etc.]

**Authentication/Authorization:**
- [How authentication is handled]

**Deployment:**
- [How and where it's deployed]

**Scaling Strategy:**
- [Horizontal, vertical, or n/a]

**Monitoring & Logging:**
- [What metrics and logs are collected]

---

### [Container 2 Name]

**Type:** [Web Application | API | Service | Database | etc.]  
**Technology Stack:**
- Language: [e.g., Node.js]
- Framework: [e.g., Express]
- ORM: [e.g., Prisma]

**Purpose:**
[Describe what this container does and why it exists]

**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]

**Exposed Interfaces:**
- [API endpoints]

**Data Access:**
- [Which databases it accesses]

**Integration Points:**
- [External systems it integrates with]

---

### [Database Name]

**Type:** [Relational | Document | Key-Value | Graph]  
**Technology:** [e.g., PostgreSQL 15]

**Purpose:**
[What data is stored and why]

**Schema:**
- [Brief description of main tables/collections]

**Backup Strategy:**
- [How backups are performed]

**Scaling Strategy:**
- [Read replicas, sharding, etc.]

---

## Communication Patterns

### Synchronous Communication
- **[Container A] → [Container B]:** [Protocol, data format, purpose]
- **[Container C] → [External System]:** [Protocol, data format, purpose]

### Asynchronous Communication
- **Event:** [Event Name]
  - **Publisher:** [Container]
  - **Subscribers:** [Container(s)]
  - **Purpose:** [Why this event exists]

## Technology Decisions

### Frontend
- **Framework:** [Choice and reasoning]
- **State Management:** [Choice and reasoning]
- **Build Tool:** [Choice and reasoning]

### Backend
- **Language/Runtime:** [Choice and reasoning]
- **Framework:** [Choice and reasoning]
- **API Style:** [REST, GraphQL, gRPC, etc. and reasoning]

### Data Storage
- **Primary Database:** [Choice and reasoning]
- **Cache:** [Choice and reasoning]
- **Object Storage:** [Choice and reasoning]

### Infrastructure
- **Cloud Provider:** [Choice and reasoning]
- **Orchestration:** [Kubernetes, ECS, etc.]
- **CI/CD:** [Platform and approach]

## Cross-Cutting Concerns

### Security
- [Authentication approach]
- [Authorization approach]
- [Data encryption at rest/in transit]
- [Secret management]

### Observability
- **Logging:** [Strategy and tools]
- **Metrics:** [What's monitored and tools]
- **Tracing:** [Distributed tracing approach]
- **Alerting:** [Alert strategy and tools]

### Resilience
- [Retry strategies]
- [Circuit breakers]
- [Fallback mechanisms]
- [Disaster recovery]

## Deployment Architecture

[Describe how containers are deployed, orchestrated, and scaled]

## Performance Considerations

- [Caching strategy]
- [Database optimization]
- [CDN usage]
- [Load balancing]

## Related Documentation

- [Link to Context Diagram](../01-context/system-context.md)
- [Link to Component Diagrams](../03-component/)
- [Link to relevant ADRs](../adr/)
- [Link to deployment documentation]
