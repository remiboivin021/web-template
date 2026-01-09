/**
 * @file ErrorHandler.ts
 * @brief Error handling middleware
 */

import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
}
