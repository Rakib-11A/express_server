import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env')});

export const config = {
    port: process.env.PORT || 5000,
    databaseUrl: process.env.CONNECTION_STRING,
    nodeEnv: process.env.NODE_ENV || 'development',
};