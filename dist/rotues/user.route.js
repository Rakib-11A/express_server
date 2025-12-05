"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const route = (0, express_1.Router)();
route.post('/', user_controller_1.userControllers.createUser);
route.get('/', (0, auth_1.default)('admin'), user_controller_1.userControllers.getAllUsers);
route.get('/:id', user_controller_1.userControllers.getUserById);
route.put('/:id', user_controller_1.userControllers.updateUser);
route.delete('/:id', user_controller_1.userControllers.deleteUser);
exports.userRouter = route;
//# sourceMappingURL=user.route.js.map