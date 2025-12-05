"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.pool = void 0;
const pg_1 = require("pg");
const env_1 = require("./env");
exports.pool = new pg_1.Pool({
    connectionString: env_1.config.databaseUrl
});
const initDB = async () => {
    try {
        await exports.pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(50) NOT NULL,
                age INT,
                phone VARCHAR(15),
                address TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        await exports.pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(250) NOT NULL,
                description TEXT,
                completed BOOLEAN DEFAULT FALSE,
                due_date DATE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('✅ Database initialized successfully');
    }
    catch (error) {
        console.error('❌ Database initialization error: ', error);
        throw error;
    }
};
exports.initDB = initDB;
//# sourceMappingURL=database.js.map