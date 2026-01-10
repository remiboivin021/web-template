/**
 * @file typeorm.config.ts
 * @brief TypeORM data source configuration
 * @description Configures TypeORM connection and settings
 */

import { DataSource, DataSourceOptions } from 'typeorm';
import { Logger } from '../../../shared/logger';
import { UserEntity } from './entities/UserEntity';

const logger = Logger.getInstance('TypeORM');

/**
 * @brief TypeORM configuration options
 */
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'web_template',
    entities: [UserEntity],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    logger: 'advanced-console',
    migrations: [],
    migrationsRun: false,
};

/**
 * @brief Create TypeORM data source instance
 */
export const AppDataSource = new DataSource(dataSourceOptions);

/**
 * @brief Initialize TypeORM connection
 */
export async function initializeDataSource(): Promise<DataSource> {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            logger.info('TypeORM data source initialized successfully');
        }
        return AppDataSource;
    } catch (error) {
        logger.error('Error initializing TypeORM data source', error);
        throw error;
    }
}

/**
 * @brief Close TypeORM connection
 */
export async function closeDataSource(): Promise<void> {
    try {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            logger.info('TypeORM data source closed successfully');
        }
    } catch (error) {
        logger.error('Error closing TypeORM data source', error);
        throw error;
    }
}

/**
 * @brief Check database health
 */
export async function checkDatabaseHealth(): Promise<boolean> {
    try {
        if (!AppDataSource.isInitialized) {
            return false;
        }
        await AppDataSource.query('SELECT 1');
        return true;
    } catch (error) {
        logger.error('Database health check failed', error);
        return false;
    }
}
