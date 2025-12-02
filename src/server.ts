/**
 * Title: CRUD operation 
 * Description: Learning Express doing CRUD operation using postgres, neondb, typescritp
 * Author: Rakib Hasan
 * Date: 30/11/2025
 */
import express, { Request, Response } from "express";
import { config } from './config/env'
import { initDB } from './config/database'
import { pool } from './config/database'
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

app.get('/', (req: Request, res: Response) => {
    res.send("Alhamdulillah......working.......fine.....");
})

//user CRUD
// Create user
app.post('/users', async (req: Request, res: Response) => {
    const { name, email, age, phone, address } = req.body;
    try{
        const query = "INSERT INTO users (name, email, age, phone, address) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [name, email, age, phone, address];
        const result = await pool.query(query, values);
        // console.log(result.rows[0]);

        res.status(201).json({
            message: "User added successfully",
            user: result.rows[0],
        });

    } catch (error: unknown) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        });
    }
});

// Get all users
app.get('/users', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result.rows,
        });

    } catch (error: unknown) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        });
    }
});

// Get a single user
app.get('/users/:id', async (req: Request, res: Response) => {
    // console.log(req.params);
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];

        const result = await pool.query(query, values);
        if (result.rowCount !== 0) {
            return res.status(200).json({
                success: true,
                message: 'User retrieved successfully',
                data: result.rows[0],
            });
        }

        return res.status(404).json({
            success: false,
            message: 'User not found',
        });

    } catch (error: unknown) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        });
    }
});

// Update user (PUT)
app.put('/users/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const { name, email, age, phone, address } = req.body;
    try{
        const query = `UPDATE users SET name=$1, email=$2, age=$3, phone=$4, address=$5 WHERE id=$6 RETURNING *`;
        const values = [name, email, age, phone, address, id];

        const result = await pool.query(query, values);
        if(result.rowCount !== 0){
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: result.rows[0],
            })
        }else{
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
    }catch(error: unknown){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        })
    }
});

// delete user
app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if(result.rowCount !== 0){
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: result.rows[0]
            })
        }
        return res.status(404).json({
            success: false, 
            message: 'User not found'
        })
    }catch(error: unknown){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: true,
            message,
        })
    }
});



// TODOS CRUD
// Create todos (POST)
app.post('/todos', async (req: Request, res: Response) => {
    const { user_id, title, description, completed, due_date } = req.body;
    try{
        const query = `INSERT INTO todos (user_id, title, description, completed, due_date) VALUES($1, $2, $3, $4, $5)`;
        const values = [user_id, title, description, completed, due_date];
        const result = await pool.query(query, values);

        return res.status(200).json({
            success: true,
            message: 'TODOS created successfully'
        });

    }catch(error: unknown){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
});

// Get all todos (GET)
app.get('/todos', async (req: Request, res: Response) => {
    try{
        const query = 'SELECT * FROM todos';
        const result = await pool.query(query);
        if(result.rowCount !== 0){
            return res.status(200).json({
                success: true,
                message: 'Fetch all todos',
                data: result.rows
            })
        }
        return res.status(404).json({
            success: false,
            messsage: 'TODOS not found'
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
})

// Get single todos (GET)
app.get('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const query = 'SELECT * FROM todos WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if(result.rowCount !==0 ){
            return res.status(200).json({
                success: true, 
                message: 'Fetch todo successfully',
                data: result.rows[0]
            })
        }
        return res.status(404).json({
            success: false,
            message: 'todos not found'
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
});

// Update todos (PUT)
app.put('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, title, description, completed } = req.body;
    try{
        const query = `UPDATE todos SET user_id=$1, title=$2, description=$3, completed=$4 WHERE id = $5`;
        const values = [user_id, title, description, completed, id];
        const result = await pool.query(query, values);
        if(result.rowCount !== 0 ) {
            return res.status(200).json({
                success: true,
                message: 'todos updated successfully',
                data: result.rows[0]
            })
        }
        return res.status(404).json({
            success: false, 
            message: 'todos not found',
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
})
// Delete todos (Delete)
app.delete('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const query = `DELETE FROM todos WHERE id = $1`;
        const values = [id];
        const result = await pool.query(query, values);
        if(result.rowCount !== 0){
            return res.status(200).json({
                success: true,
                messsage: 'todos deleted successfully'
            })
        }
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})