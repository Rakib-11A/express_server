import { IUser, IUserInput } from "../interfaces/user.interface";
import { pool } from "../config/database";
import bcrypt from 'bcryptjs';

const createUser = async (userData: IUserInput): Promise<IUserInput> => {
    const { name, email, password, role, age, phone, address } = userData;
    const hashedPass = await bcrypt.hash(password as string, 10);
    const query = "INSERT INTO users (name, email, password, role, age, phone, address) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const values = [name, email, hashedPass, role, age, phone, address];
        const result = await pool.query(query, values);
        return result.rows[0];
}

const getAllUsers = async (): Promise<IUserInput[]> => {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
}

const getUserById = async (id: number): Promise<IUserInput> => {
    const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
}

const updateUser = async (id: number, userData: IUser): Promise<IUserInput> => {
    if (!userData) {
        throw new Error('User data is required for update');
    }
    const { name, email, age, phone, address } = userData;
    const query = `UPDATE users SET name=$1, email=$2, age=$3, phone=$4, address=$5 WHERE id=$6 RETURNING *`;
        const values = [name, email, age, phone, address, id];
        const result = await pool.query(query, values);

        return result.rows[0] || null;
}

const deleteUser = async (id: number): Promise<boolean> => {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rowCount !== null && result.rowCount > 0;
}
export const userServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}