import { Request, Response } from "express";
import { pool } from "../config/database";
import { todoServices } from "../services/todo.service";
const createTodo = async (req: Request, res: Response) => {
    try{
        const resutl = await todoServices.createTodo(req.body);

        return res.status(200).json({
            success: true,
            message: 'TODOS created successfully'
        });

    }catch(error: unknown){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
}

const getAllTodos = async (req: Request, res: Response) => {
    try{
        const result = await todoServices.getAllTodos();
        if(result){
            return res.status(200).json({
                success: true,
                message: 'Fetch all todos',
                data: result
            })
        }
        return res.status(404).json({
            success: false,
            messsage: 'TODOS not found'
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
}

const getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await todoServices.getTodoById(+req.params.id);
        if(result){
            return res.status(200).json({
                success: true, 
                message: 'Fetch todo successfully',
                data: result
            })
        }
        return res.status(404).json({
            success: false,
            message: 'todos not found'
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
}
const updateTodo = async (req: Request, res: Response) => {
    try{
        const result = await todoServices.updateTodo(+req.params.id, req.body)
        if(result) {
            return res.status(200).json({
                success: true,
                message: 'todos updated successfully',
                data: result
            })
        }
        return res.status(404).json({
            success: false, 
            message: 'todos not found',
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    try{
        const result = await todoServices.deleteTodo(+req.params.id);
        if(result){
            return res.status(200).json({
                success: true,
                message: 'todos deleted successfully'
            })
        }
        return res.status(404).json({
            success: false,
            message: 'todos not found'
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
}
export const todoControllers = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
}