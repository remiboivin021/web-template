"use strict";
/**
 * @file userRoutes.ts
 * @brief User routes configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = createUserRoutes;
const express_1 = require("express");
const UserController_1 = require("../UserController");
function createUserRoutes() {
    const router = (0, express_1.Router)();
    const userController = new UserController_1.UserController();
    router.get("/", (req, res) => userController.getAllUsers(req, res));
    router.get("/:id", (req, res) => userController.getUserById(req, res));
    router.post("/", (req, res) => userController.createUser(req, res));
    router.put("/:id", (req, res) => userController.updateUser(req, res));
    router.delete("/:id", (req, res) => userController.deleteUser(req, res));
    return router;
}
//# sourceMappingURL=userRoutes.js.map