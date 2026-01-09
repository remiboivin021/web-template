/**
 * @file container.ts
 * @brief Dependency injection container configuration
 */

import "reflect-metadata";
import { container } from "tsyringe";
import { TYPES } from "./types";

// Import implementations
import { UserRepository } from "../persistence/repositories/UserRepository";
import { IUserRepository } from "../../application/ports/outbound/IUserRepository";

/**
 * @function setupContainer
 * @brief Configures all dependency bindings
 */
export function setupContainer(): void {
  // Register Repositories
  container.register<IUserRepository>(TYPES.IUserRepository, {
    useClass: UserRepository,
  });

  // Add more registrations as needed
}

export { container };