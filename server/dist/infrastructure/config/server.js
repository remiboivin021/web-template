"use strict";
/**
 * @file server.ts
 * @brief Server configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
exports.serverConfig = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
    env: process.env.NODE_ENV || "development",
};
//# sourceMappingURL=server.js.map