import { ITodo, ITodoInput } from "../interfaces/todo.interface";
export declare const todoServices: {
    createTodo: (todoData: ITodo) => Promise<ITodoInput>;
    getAllTodos: () => Promise<ITodoInput[]>;
    getTodoById: (id: number) => Promise<ITodoInput>;
    updateTodo: (id: number, todoData: ITodo) => Promise<ITodoInput>;
    deleteTodo: (id: number) => Promise<boolean>;
};
//# sourceMappingURL=todo.service.d.ts.map