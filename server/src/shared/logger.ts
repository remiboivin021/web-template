/**
 * @file logger.ts
 * @brief Centralized logging utility
 * @description Provides structured logging capabilities for the entire application
 */

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: string;
    metadata?: Record<string, unknown>;
    stack?: string;
}

export class Logger {
    private static instance: Logger;
    private context: string;

    private constructor(context: string = 'Application') {
        this.context = context;
    }

    /**
     * @brief Get or create logger instance
     * @param context - Optional context name for the logger
     */
    public static getInstance(context?: string): Logger {
        if (!Logger.instance || context) {
            Logger.instance = new Logger(context || 'Application');
        }
        return Logger.instance;
    }

    /**
     * @brief Create a new logger with a specific context
     * @param context - Context name for the logger
     */
    public static create(context: string): Logger {
        return new Logger(context);
    }

    private formatLog(level: LogLevel, message: string, metadata?: Record<string, unknown>): LogEntry {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            context: this.context,
            ...(metadata && { metadata }),
        };
    }

    private output(entry: LogEntry): void {
        const colorCodes = {
            DEBUG: '\x1b[36m', // Cyan
            INFO: '\x1b[32m',  // Green
            WARN: '\x1b[33m',  // Yellow
            ERROR: '\x1b[31m', // Red
        };
        const resetCode = '\x1b[0m';

        const color = colorCodes[entry.level];
        const prefix = `${color}[${entry.timestamp}] [${entry.level}] [${entry.context}]${resetCode}`;
        
        const logMessage = `${prefix} ${entry.message}`;
        
        if (entry.level === LogLevel.ERROR) {
            console.error(logMessage, entry.metadata || '');
            if (entry.stack) {
                console.error(entry.stack);
            }
        } else if (entry.level === LogLevel.WARN) {
            console.warn(logMessage, entry.metadata || '');
        } else {
            console.log(logMessage, entry.metadata || '');
        }
    }

    public debug(message: string, metadata?: Record<string, unknown>): void {
        if (process.env.NODE_ENV === 'development') {
            const entry = this.formatLog(LogLevel.DEBUG, message, metadata);
            this.output(entry);
        }
    }

    public info(message: string, metadata?: Record<string, unknown>): void {
        const entry = this.formatLog(LogLevel.INFO, message, metadata);
        this.output(entry);
    }

    public warn(message: string, metadata?: Record<string, unknown>): void {
        const entry = this.formatLog(LogLevel.WARN, message, metadata);
        this.output(entry);
    }

    public error(message: string, error?: Error | unknown, metadata?: Record<string, unknown>): void {
        const entry = this.formatLog(LogLevel.ERROR, message, metadata);
        
        if (error instanceof Error) {
            entry.stack = error.stack;
            entry.metadata = {
                ...entry.metadata,
                error: {
                    name: error.name,
                    message: error.message,
                },
            };
        } else if (error) {
            entry.metadata = {
                ...entry.metadata,
                error,
            };
        }

        this.output(entry);
    }

    /**
     * @brief Log with custom level
     */
    public log(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
        const entry = this.formatLog(level, message, metadata);
        this.output(entry);
    }
}

// Export default instance
export const logger = Logger.getInstance();
