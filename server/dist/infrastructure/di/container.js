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
// Import implementations
// TODO: Uncomment when repositories are implemented
// import { UserRepository } from "../repositories/UserRepository";
// import { IUserRepository } from "../../domain/services/IUserRepository";
/**
 * @function setupContainer
 * @brief Configures all dependency bindings
 */
function setupContainer() {
    // Register Repositories
    // TODO: Uncomment when repositories are implemented
    // container.register<IUserRepository>(TYPES.IUserRepository, {
    //   useClass: UserRepository,
    // });
    // Add more registrations as needed
}
//# sourceMappingURL=container.js.map