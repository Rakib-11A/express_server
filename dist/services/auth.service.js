"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const loginUser = async (email, password) => {
    const query = `SELECT * FROM users WHERE email=$1`;
    const values = [email];
    const result = await database_1.pool.query(query, values);
    if (result.rowCount === 0)
        return null;
    const user = result.rows[0];
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return null;
    const secret = env_1.config.jwtSecret;
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, secret, {
        expiresIn: '7d',
    });
    console.log(token);
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};
exports.authServices = {
    loginUser,
};
//# sourceMappingURL=auth.service.js.map