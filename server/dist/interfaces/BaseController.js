"use strict";
/**
 * @file BaseController.ts
 * @brief Base controller with common functionality
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    ok(res, data) {
        if (data) {
            return res.status(200).json(data);
        }
        return res.sendStatus(200);
    }
    created(res, data) {
        if (data) {
            return res.status(201).json(data);
        }
        return res.sendStatus(201);
    }
    badRequest(res, message) {
        return res.status(400).json({ error: message || "Bad request" });
    }
    notFound(res, message) {
        return res.status(404).json({ error: message || "Not found" });
    }
    fail(res, error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map