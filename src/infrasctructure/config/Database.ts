// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// export class Database {
//     private static pool: mysql.Pool | null = null;

//     public static async init() {
//         if (!this.pool) {
//             this.pool = mysql.createPool({
//                 host: process.env.DB_HOST,
//                 user: process.env.DB_USER,
//                 password: process.env.DB_PASSWORD,
//                 database: process.env.DB_NAME,
//                 waitForConnections: true,
//                 connectionLimit: 10,
//                 queueLimit: 0
//             })
//         }
//     }

//     public static getConnection(){
//         if (!this.pool) {
//             throw new Error("Database pool não iniciado. Execute o init()");
//         }

//         return this.pool;   
//     }

//     public static async close() {
//         if (this.pool) {
//             await this.pool.end();
//             this.pool = null;
//         }
//     }
// }

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@domain/entities/User";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true, // use com cautela em produção!
});
