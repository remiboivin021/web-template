/**
 * @file container.ts
 * @brief Dependency injection container configuration
 */

import "reflect-metadata";
import { container } from "tsyringe";
import { TYPES } from "./types";

// Import implementations
// TODO: Uncomment when repositories are implemented
// import { UserRepository } from "../repositories/UserRepository";
// import { IUserRepository } from "../../domain/services/IUserRepository";

/**
 * @function setupContainer
 * @brief Configures all dependency bindings
 */
export function setupContainer(): void {
  // Register Repositories
  // TODO: Uncomment when repositories are implemented
  // container.register<IUserRepository>(TYPES.IUserRepository, {
  //   useClass: UserRepository,
  // });

  // Add more registrations as needed
}

export { container };