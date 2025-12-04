import { Router } from "express";
import { todoControllers } from "../controllers/todo.controller";

const route = Router();

route.post('/', todoControllers.createTodo);
route.get('/', todoControllers.getAllTodos);
route.get('/:id', todoControllers.getTodoById);
route.put('/:id', todoControllers.updateTodo);
route.delete('/:id', todoControllers.deleteTodo);

export const todoRouter = route;