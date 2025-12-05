"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (userData) => {
    const { name, email, password, role, age, phone, address } = userData;
    const hashedPass = await bcryptjs_1.default.hash(password, 10);
    const query = "INSERT INTO users (name, email, password, role, age, phone, address) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [name, email, hashedPass, role, age, phone, address];
    const result = await database_1.pool.query(query, values);
    return result.rows[0];
};
const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const result = await database_1.pool.query(query);
    return result.rows;
};
const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await database_1.pool.query(query, values);
    return result.rows[0] || null;
};
const updateUser = async (id, userData) => {
    if (!userData) {
        throw new Error('User data is required for update');
    }
    const { name, email, age, phone, address } = userData;
    const query = `UPDATE users SET name=$1, email=$2, age=$3, phone=$4, address=$5 WHERE id=$6 RETURNING *`;
    const values = [name, email, age, phone, address, id];
    const result = await database_1.pool.query(query, values);
    return result.rows[0] || null;
};
const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    const result = await database_1.pool.query(query, values);
    return result.rowCount !== null && result.rowCount > 0;
};
exports.userServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
//# sourceMappingURL=user.service.js.map