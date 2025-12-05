/**
 * Title: CRUD operation 
 * Description: Learning Express doing CRUD operation using postgres, neondb, typescritp
 * Author: Rakib Hasan
 * Date: 30/11/2025
 */
import express, { Request, Response, NextFunction } from "express";
import { config } from './config/env'
import { initDB } from './config/database'
import { logger } from "./middlewares/logger";
import { userRouter } from "./rotues/user.route";
import { todoRouter } from "./rotues/todo.route";
import { authRoutes } from "./rotues/auth.route";

const app = express();
const port = config.port
// parser
app.use(express.json());

// form data er jonno
// app.use(express.urlencoded());

// Initializing DB (non-blocking)
initDB().catch(error => {
    console.error('Failed to initialize database:', error);
    // Don't exit - allow server to run so user can see the error via API
});


app.get('/',logger, (req: Request, res: Response) => {
    res.send("Alhamdulillah......working.......fine.....");
})

//user CRUD
// Create user
app.use('/users', userRouter)

app.use('/todos', todoRouter)

app.use('/auth', authRoutes)

app.use((req,res) => {
    res.status(404).json({
        success: false,
        message: 'Route on found',
        path: req.path
    });
});

export default app;