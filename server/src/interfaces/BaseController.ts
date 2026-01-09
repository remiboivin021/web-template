/**
 * @file BaseController.ts
 * @brief Base controller with common functionality
 */

import { Response } from "express";

export abstract class BaseController {
  protected ok<T>(res: Response, data?: T): Response {
    if (data) {
      return res.status(200).json(data);
    }
    return res.sendStatus(200);
  }

  protected created<T>(res: Response, data?: T): Response {
    if (data) {
      return res.status(201).json(data);
    }
    return res.sendStatus(201);
  }

  protected badRequest(res: Response, message?: string): Response {
    return res.status(400).json({ error: message || "Bad request" });
  }

  protected notFound(res: Response, message?: string): Response {
    return res.status(404).json({ error: message || "Not found" });
  }

  protected fail(res: Response, error: Error | string): Response {
    return res.status(500).json({
      error: error instanceof Error ? error.message : error,
    });
  }
}
