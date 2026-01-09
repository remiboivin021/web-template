"use strict";
/**
 * @file ErrorHandler.ts
 * @brief Error handling middleware
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error("Error:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
    });
}
//# sourceMappingURL=ErrorHandler.js.map