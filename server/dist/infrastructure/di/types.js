"use strict";
/**
 * @file types.ts
 * @brief Dependency injection symbols/identifiers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
exports.TYPES = {
    // Repositories
    IUserRepository: Symbol.for("IUserRepository"),
    // Services
    UserService: Symbol.for("UserService"),
    // Infrastructure
    DatabaseConnection: Symbol.for("DatabaseConnection"),
    Logger: Symbol.for("Logger"),
};
//# sourceMappingURL=types.js.map