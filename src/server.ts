import express, { Request, Response } from "express";
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), ".env")});

const app = express();
const port = `${process.env.PORT}`;

// parser
app.use(express.json());

// form data er jonno
// app.use(express.urlencoded());

// Database connection
const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STRING}`
});

const initDB = async() => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            age INT,
            phone VARCHAR(15),
            address TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `)
};

initDB();

app.get('/', (req: Request, res: Response) => {
    res.send("Alhamdulillah......Rakib Hasan    ")
})

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).json({
        success: true,
        message: "API is working fine. Alhamdulillah...",
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})