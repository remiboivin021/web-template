/**
 * @file Server.ts
 * @brief HTTP Server implementation
 */
import { Application } from "express";
export declare class Server {
    private app;
    private port;
    private host;
    constructor();
    /**
     * @brief Configure middleware
     */
    private setupMiddleware;
    /**
     * @brief Configure routes
     */
    private setupRoutes;
    /**
     * @brief Configure error handling
     */
    private setupErrorHandling;
    /**
     * @brief Start the server
     */
    start(): void;
    /**
     * @brief Get Express application instance
     */
    getApp(): Application;
}
//# sourceMappingURL=Server.d.ts.map