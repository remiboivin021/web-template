/**
 * @file logger.ts
 * @brief Centralized logging utility
 * @description Provides structured logging capabilities for the entire application
 */
export declare enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: string;
    metadata?: Record<string, unknown>;
    stack?: string;
}
export declare class Logger {
    private static instance;
    private context;
    private constructor();
    /**
     * @brief Get or create logger instance
     * @param context - Optional context name for the logger
     */
    static getInstance(context?: string): Logger;
    /**
     * @brief Create a new logger with a specific context
     * @param context - Context name for the logger
     */
    static create(context: string): Logger;
    private formatLog;
    private output;
    debug(message: string, metadata?: Record<string, unknown>): void;
    info(message: string, metadata?: Record<string, unknown>): void;
    warn(message: string, metadata?: Record<string, unknown>): void;
    error(message: string, error?: Error | unknown, metadata?: Record<string, unknown>): void;
    /**
     * @brief Log with custom level
     */
    log(level: LogLevel, message: string, metadata?: Record<string, unknown>): void;
}
export declare const logger: Logger;
//# sourceMappingURL=logger.d.ts.map