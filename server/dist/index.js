"use strict";
/**
 * @file index.ts
 * @brief Application entry point
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("./infrastructure/di/container");
const Server_1 = require("./infrastructure/http/Server");
// Setup dependency injection
(0, container_1.setupContainer)();
// Start HTTP server
const server = new Server_1.Server();
server.start();
//# sourceMappingURL=index.js.map