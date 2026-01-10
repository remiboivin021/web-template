/**
 * @file container.ts
 * @brief Dependency injection container configuration
 */

import "reflect-metadata";
import { container } from "tsyringe";
import { TYPES } from "./types";
import { initializeDataSource } from "../persistence/typeorm/typeorm.config";

// Import implementations
import { UserRepository } from "../persistence/repositories/UserRepository";
import { IUserRepository } from "../../application/ports/outbound/IUserRepository";
import { UserController } from '../http/controllers/UserController';
import { UserService } from "../../application/services/UserService";

/**
 * @function setupContainer
 * @brief Configures all dependency bindings and initializes TypeORM
 */
export async function setupContainer(): Promise<void> {
  // Initialize TypeORM connection
  await initializeDataSource();

  // Register Repositories
  container.register<IUserRepository>(TYPES.IUserRepository, {
    useClass: UserRepository,
  });
  // Register Controllers  
  container.register(UserController, { useClass: UserController });
  // Register Services
  container.register(UserService, { useClass: UserService });
}

export { container };