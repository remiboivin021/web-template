/**
 * @file index.ts
 * @brief Application entry point
 */

import "reflect-metadata";
import { setupContainer } from "./infrastructure/di/container";

// Setup dependency injection
setupContainer();

// TODO: Start your HTTP server here
console.log("Server starting...");