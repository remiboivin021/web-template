/**
 * @file database.ts
 * @brief Database connection management
 * @description Re-exports TypeORM data source and connection utilities
 */

export { 
    AppDataSource, 
    initializeDataSource, 
    closeDataSource, 
    checkDatabaseHealth 
} from './typeorm/typeorm.config';
