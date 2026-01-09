"use strict";
/**
 * @file Server.ts
 * @brief HTTP Server implementation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("../config/server");
const logger_1 = require("./middleware/logger");
const cors_1 = require("./middleware/cors");
const ErrorHandler_1 = require("./middleware/ErrorHandler");
const userRoutes_1 = require("../../interfaces/routes/userRoutes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = server_1.serverConfig.port;
        this.host = server_1.serverConfig.host;
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }
    /**
     * @brief Configure middleware
     */
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.cors);
        this.app.use(logger_1.logger);
    }
    /**
     * @brief Configure routes
     */
    setupRoutes() {
        // Health check endpoint
        this.app.get("/health", (req, res) => {
            res.json({ status: "ok", timestamp: new Date().toISOString() });
        });
        // API routes
        this.app.use("/api/users", (0, userRoutes_1.createUserRoutes)());
        // 404 handler
        this.app.use((req, res) => {
            res.status(404).json({ error: "Not found" });
        });
    }
    /**
     * @brief Configure error handling
     */
    setupErrorHandling() {
        this.app.use(ErrorHandler_1.errorHandler);
    }
    /**
     * @brief Start the server
     */
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://${this.host}:${this.port}`);
            console.log(`Environment: ${server_1.serverConfig.env}`);
            console.log(`Health check: http://${this.host}:${this.port}/health`);
        });
    }
    /**
     * @brief Get Express application instance
     */
    getApp() {
        return this.app;
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map