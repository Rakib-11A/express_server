import { Router, Request, Response } from "express";
import { pool } from "../config/database";
import { userControllers } from "../controllers/user.controller";
import auth from "../middlewares/auth";
const route = Router();

route.post('/', userControllers.createUser);
route.get('/', auth('admin'), userControllers.getAllUsers);
route.get('/:id', userControllers.getUserById)
route.put('/:id', userControllers.updateUser);
route.delete('/:id', userControllers.deleteUser);

export const userRouter = route;

