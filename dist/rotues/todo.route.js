"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const route = (0, express_1.Router)();
route.post('/', todo_controller_1.todoControllers.createTodo);
route.get('/', todo_controller_1.todoControllers.getAllTodos);
route.get('/:id', todo_controller_1.todoControllers.getTodoById);
route.put('/:id', todo_controller_1.todoControllers.updateTodo);
route.delete('/:id', todo_controller_1.todoControllers.deleteTodo);
exports.todoRouter = route;
//# sourceMappingURL=todo.route.js.map