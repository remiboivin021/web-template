"use strict";
/**
 * @file container.ts
 * @brief Dependency injection container configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.setupContainer = setupContainer;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const types_1 = require("./types");
// Import implementations
const UserRepository_1 = require("../persistence/repositories/UserRepository");
/**
 * @function setupContainer
 * @brief Configures all dependency bindings
 */
function setupContainer() {
    // Register Repositories
    tsyringe_1.container.register(types_1.TYPES.IUserRepository, {
        useClass: UserRepository_1.UserRepository,
    });
    // Add more registrations as needed
}
//# sourceMappingURL=container.js.map