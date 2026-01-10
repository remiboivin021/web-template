"use strict";
/**
 * @file logger.ts
 * @brief Centralized logging utility
 * @description Provides structured logging capabilities for the entire application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(context = 'Application') {
        this.context = context;
    }
    /**
     * @brief Get or create logger instance
     * @param context - Optional context name for the logger
     */
    static getInstance(context) {
        if (!Logger.instance || context) {
            Logger.instance = new Logger(context || 'Application');
        }
        return Logger.instance;
    }
    /**
     * @brief Create a new logger with a specific context
     * @param context - Context name for the logger
     */
    static create(context) {
        return new Logger(context);
    }
    formatLog(level, message, metadata) {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            context: this.context,
            ...(metadata && { metadata }),
        };
    }
    output(entry) {
        const colorCodes = {
            DEBUG: '\x1b[36m', // Cyan
            INFO: '\x1b[32m', // Green
            WARN: '\x1b[33m', // Yellow
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
        }
        else if (entry.level === LogLevel.WARN) {
            console.warn(logMessage, entry.metadata || '');
        }
        else {
            console.log(logMessage, entry.metadata || '');
        }
    }
    debug(message, metadata) {
        if (process.env.NODE_ENV === 'development') {
            const entry = this.formatLog(LogLevel.DEBUG, message, metadata);
            this.output(entry);
        }
    }
    info(message, metadata) {
        const entry = this.formatLog(LogLevel.INFO, message, metadata);
        this.output(entry);
    }
    warn(message, metadata) {
        const entry = this.formatLog(LogLevel.WARN, message, metadata);
        this.output(entry);
    }
    error(message, error, metadata) {
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
        }
        else if (error) {
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
    log(level, message, metadata) {
        const entry = this.formatLog(level, message, metadata);
        this.output(entry);
    }
}
exports.Logger = Logger;
// Export default instance
exports.logger = Logger.getInstance();
//# sourceMappingURL=logger.js.map