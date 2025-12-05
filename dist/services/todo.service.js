"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoServices = void 0;
const database_1 = require("../config/database");
const createTodo = async (todoData) => {
    const { user_id, title, description, completed, due_date } = todoData;
    const query = `INSERT INTO todos (user_id, title, description, completed, due_date) VALUES($1, $2, $3, $4, $5)`;
    const values = [user_id, title, description, completed, due_date];
    const result = await database_1.pool.query(query, values);
    return result.rows[0] || null;
};
const getAllTodos = async () => {
    const query = 'SELECT * FROM todos';
    const result = await database_1.pool.query(query);
    return result.rows;
};
const getTodoById = async (id) => {
    const query = 'SELECT * FROM todos WHERE id = $1';
    const values = [id];
    const result = await database_1.pool.query(query, values);
    return result.rows[0] || null;
};
const updateTodo = async (id, todoData) => {
    const { user_id, title, description, completed } = todoData;
    const query = `UPDATE todos SET user_id=$1, title=$2, description=$3, completed=$4 WHERE id = $5`;
    const values = [user_id, title, description, completed, id];
    const result = await database_1.pool.query(query, values);
    return result.rows[0] || null;
};
const deleteTodo = async (id) => {
    const query = `DELETE FROM todos WHERE id = $1`;
    const values = [id];
    const result = await database_1.pool.query(query, values);
    return result.rowCount !== null && result.rowCount > 0;
};
exports.todoServices = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
};
//# sourceMappingURL=todo.service.js.map