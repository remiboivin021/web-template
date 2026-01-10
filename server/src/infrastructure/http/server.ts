/**
 * @file server.ts
 * @brief HTTP server setup and configuration
 * @description Creates and configures the Express application with middleware and routes
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getServerConfig } from '../config/server';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { createUserRoutes } from './routes/userRoutes';

/**
 * @class HttpServer
 * @brief HTTP server wrapper for Express application
 * @description Encapsulates Express app creation, middleware setup, and server lifecycle
 */
export class HttpServer {
    private app: Application;
    private config = getServerConfig();

    /**
     * @brief Constructs the HTTP server
     * @description Initializes Express app and configures all middleware
     */
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    /**
     * @brief Configures Express middleware
     * @private
     */
    private setupMiddleware(): void {
        // Security middleware
        this.app.use(helmet());

        // CORS configuration
        this.app.use(
            cors({
                origin: this.config.corsOrigin,
                credentials: true,
            })
        );

        // Body parsing
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Request logging
        this.app.use(logger);
    }

    /**
     * @brief Configures application routes
     * @private
     */
    private setupRoutes(): void {
        // Health check route
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'ok' });
        });

        // API routes - appelé APRÈS l'initialisation du container
        this.app.use('/api/users', createUserRoutes());

        // 404 handler
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                error: {
                    message: 'Route not found',
                    path: req.path,
                },
            });
        });
    }

    /**
     * @brief Configures error handling
     * @private
     */
    private setupErrorHandling(): void {
        this.app.use(errorHandler);
    }

    /**
     * @brief Starts the HTTP server
     * @returns {Promise<void>}
     */
    public async start(): Promise<void> {
        return new Promise((resolve) => {
            this.app.listen(this.config.port, () => {
                console.log(`🚀 Server running on port ${this.config.port}`);
                console.log(`📝 Environment: ${this.config.nodeEnv}`);
                console.log(`🔗 CORS Origin: ${this.config.corsOrigin}`);
                resolve();
            });
        });
    }

    /**
     * @brief Gets the Express application instance
     * @returns {Application} Express app
     */
    public getApp(): Application {
        return this.app;
    }
}
