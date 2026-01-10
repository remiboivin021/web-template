/**
 * @file index.ts
 * @brief Application entry point
 * @description Initializes and starts the HTTP server with dependency injection
 */

import 'reflect-metadata';
import { setupContainer } from './infrastructure/di/container';
import { Logger } from './shared/logger';
import {HttpServer} from './infrastructure/http/server';
const logger = Logger.create('Main');

/**
 * @function bootstrap
 * @brief Initializes and starts the application
 */
async function bootstrap(): Promise<void> {
  try {
    logger.info('Starting application...');

    // Setup DI container and initialize TypeORM first
    await setupContainer();
    logger.info('DI container and database initialized');

    // Import server AFTER container is setup
    const server = new HttpServer();

    server.start();
    const port = process.env.PORT || 3000;
    logger.info(`Application is running on port ${port}`);
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}

bootstrap();