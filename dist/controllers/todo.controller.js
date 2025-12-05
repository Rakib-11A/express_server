"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoControllers = void 0;
const todo_service_1 = require("../services/todo.service");
const createTodo = async (req, res) => {
    try {
        const resutl = await todo_service_1.todoServices.createTodo(req.body);
        return res.status(200).json({
            success: true,
            message: 'TODOS created successfully'
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
const getAllTodos = async (req, res) => {
    try {
        const result = await todo_service_1.todoServices.getAllTodos();
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'Fetch all todos',
                data: result
            });
        }
        return res.status(404).json({
            success: false,
            messsage: 'TODOS not found'
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
const getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await todo_service_1.todoServices.getTodoById(+req.params.id);
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'Fetch todo successfully',
                data: result
            });
        }
        return res.status(404).json({
            success: false,
            message: 'todos not found'
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
const updateTodo = async (req, res) => {
    try {
        const result = await todo_service_1.todoServices.updateTodo(+req.params.id, req.body);
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'todos updated successfully',
                data: result
            });
        }
        return res.status(404).json({
            success: false,
            message: 'todos not found',
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
const deleteTodo = async (req, res) => {
    try {
        const result = await todo_service_1.todoServices.deleteTodo(+req.params.id);
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'todos deleted successfully'
            });
        }
        return res.status(404).json({
            success: false,
            message: 'todos not found'
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.todoControllers = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
};
//# sourceMappingURL=todo.controller.js.map