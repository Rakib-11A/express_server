import { Request, Response } from "express";
export declare const todoControllers: {
    createTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllTodos: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTodoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=todo.controller.d.ts.map