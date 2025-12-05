"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Title: CRUD operation
 * Description: Learning Express doing CRUD operation using postgres, neondb, typescritp
 * Author: Rakib Hasan
 * Date: 30/11/2025
 */
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const logger_1 = require("./middlewares/logger");
const user_route_1 = require("./rotues/user.route");
const todo_route_1 = require("./rotues/todo.route");
const auth_route_1 = require("./rotues/auth.route");
const app = (0, express_1.default)();
const port = env_1.config.port;
// parser
app.use(express_1.default.json());
// form data er jonno
// app.use(express.urlencoded());
// Initializing DB (non-blocking)
(0, database_1.initDB)().catch(error => {
    console.error('Failed to initialize database:', error);
    // Don't exit - allow server to run so user can see the error via API
});
app.get('/', logger_1.logger, (req, res) => {
    res.send("Alhamdulillah......working.......fine.....");
});
//user CRUD
// Create user
app.use('/users', user_route_1.userRouter);
app.use('/todos', todo_route_1.todoRouter);
app.use('/auth', auth_route_1.authRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route on found',
        path: req.path
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map