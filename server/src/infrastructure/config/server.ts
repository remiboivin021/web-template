/**
 * @file server.ts
 * @brief Server configuration settings
 * @description Provides centralized configuration for server settings
 */

/**
 * @interface ServerConfig
 * @brief Configuration interface for server settings
 */
export interface ServerConfig {
    port: number;
    nodeEnv: string;
    corsOrigin: string;
}

/**
 * @function getServerConfig
 * @brief Retrieves server configuration from environment variables
 * @returns {ServerConfig} Server configuration object
 */
export function getServerConfig(): ServerConfig {
    return {
        port: parseInt(process.env.PORT || '3000', 10),
        nodeEnv: process.env.NODE_ENV || 'development',
        corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    };
}
