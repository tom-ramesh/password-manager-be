import { query } from "../config/database.js";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  token?: string;
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface UserWithoutPassword {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  token?: string;
}

export async function createUser({
  username,
  email,
  password,
}: UserInput): Promise<UserWithoutPassword> {
  const queryText = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at
  `;
  const values = [username, email, password];
  const { rows } = await query(queryText, values);
  return rows[0];
}

export async function findByEmail(email: string): Promise<User | null> {
  const queryText = "SELECT * FROM users WHERE email = $1";
  const { rows } = await query(queryText, [email]);
  return rows[0] || null;
}

export async function findById(
  id: string
): Promise<UserWithoutPassword | null> {
  const queryText =
    "SELECT id, username, email, created_at FROM users WHERE id = $1";
  const { rows } = await query(queryText, [id]);
  return rows[0] || null;
}
