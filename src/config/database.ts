import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

interface DatabaseConfig {
  host: string | undefined;
  port: number | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} as DatabaseConfig);

export const query = (text: string, params?: any[]) => pool.query(text, params);
export { pool };
