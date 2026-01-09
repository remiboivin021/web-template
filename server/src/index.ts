/**
 * @file index.ts
 * @brief Application entry point
 */

import "reflect-metadata";
import { setupContainer } from "./infrastructure/di/container";
import { Server } from "./infrastructure/http/Server";

// Setup dependency injection
setupContainer();

// Start HTTP server
const server = new Server();
server.start();