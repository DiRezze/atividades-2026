import { Pool } from 'pg';

const poolConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '5432',
    database: 'postgres',
    ssl: false,
    max: 6
}

export const pool = new Pool(poolConfig);
