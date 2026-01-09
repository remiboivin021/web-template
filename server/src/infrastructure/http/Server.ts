/**
 * @file Server.ts
 * @brief HTTP Server implementation
 */

import express, { Application } from "express";
import { serverConfig } from "../config/server";
import { logger } from "./middleware/logger";
import { cors } from "./middleware/cors";
import { errorHandler } from "./middleware/ErrorHandler";
import { createUserRoutes } from "../../interfaces/routes/userRoutes";

export class Server {
  private app: Application;
  private port: number | string;
  private host: string;

  constructor() {
    this.app = express();
    this.port = serverConfig.port;
    this.host = serverConfig.host;
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * @brief Configure middleware
   */
  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors);
    this.app.use(logger);
  }

  /**
   * @brief Configure routes
   */
  private setupRoutes(): void {
    // Health check endpoint
    this.app.get("/health", (req, res) => {
      res.json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // API routes
    this.app.use("/api/users", createUserRoutes());

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({ error: "Not found" });
    });
  }

  /**
   * @brief Configure error handling
   */
  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  /**
   * @brief Start the server
   */
  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://${this.host}:${this.port}`);
      console.log(`Environment: ${serverConfig.env}`);
      console.log(`Health check: http://${this.host}:${this.port}/health`);
    });
  }

  /**
   * @brief Get Express application instance
   */
  public getApp(): Application {
    return this.app;
  }
}
