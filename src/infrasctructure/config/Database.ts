import { createPool, Pool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export class Database {
    private static pool: Pool;

    private constructor(){}

    public static getConnection(): Pool {
        if (!this.pool) {
            this.pool = createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            })
        }
        return this.pool;
    }
}