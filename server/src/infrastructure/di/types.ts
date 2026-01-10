/**
 * @file types.ts
 * @brief Dependency injection symbols/identifiers
 */

export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  
  // Services
  UserService: Symbol.for("UserService"),
  
  // Infrastructure
  DatabaseConnection: Symbol.for("DatabaseConnection"),
  Logger: Symbol.for("Logger"),
} as const;