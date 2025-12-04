
import { pool } from "../config/database";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { config } from "../config/env";

const loginUser = async (email: string, password: string) => {
    const query = `SELECT * FROM users WHERE email=$1`;
    const values = [email];
    const result = await pool.query(query, values);

    if(result.rowCount === 0) return null;
    
    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if(!match) return null;

    const secret = config.jwtSecret ;
    const token = jwt.sign({id: user.id, name: user.name, email: user.email,  role: user.role}, secret as string, {
        expiresIn: '7d',
    });

    console.log(token);

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export const authServices = {
    loginUser,
}