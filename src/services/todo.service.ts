import { ITodo, ITodoInput } from "../interfaces/todo.interface";
import { pool } from "../config/database";
const createTodo = async (todoData: ITodo): Promise<ITodoInput> => {
    const { user_id, title, description, completed, due_date } = todoData;
    const query = `INSERT INTO todos (user_id, title, description, completed, due_date) VALUES($1, $2, $3, $4, $5)`;
    const values = [user_id, title, description, completed, due_date];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
}

const getAllTodos = async (): Promise<ITodoInput[]> => {
    const query = 'SELECT * FROM todos';
    const result = await pool.query(query);
    return result.rows;
}

const getTodoById = async (id: number): Promise<ITodoInput> => {
    const query = 'SELECT * FROM todos WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
}

const updateTodo = async (id: number, todoData: ITodo): Promise<ITodoInput> => {
    const { user_id, title, description, completed } = todoData;
    const query = `UPDATE todos SET user_id=$1, title=$2, description=$3, completed=$4 WHERE id = $5`;
    const values = [user_id, title, description, completed, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
}

const deleteTodo = async (id: number): Promise<boolean> => {

        const query = `DELETE FROM todos WHERE id = $1`;
        const values = [id];
        const result = await pool.query(query, values);
        return result.rowCount !== null && result.rowCount > 0;
}
export const todoServices = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
}