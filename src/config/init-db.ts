import { query } from "./database.js";

/**
 * Initialize the database with required tables
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Create users table
    await query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC')
      )
    `);

    // Create credentials table
    await query(`
      CREATE TABLE IF NOT EXISTS credentials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        label VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        url VARCHAR(255),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC')
      )
    `);

    //Create logs table
    await query(`
      CREATE TABLE IF NOT EXISTS logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        credential_id UUID REFERENCES credentials(id) ON DELETE SET NULL,
        action VARCHAR(255) NOT NULL,
        old_data JSONB,
        new_data JSONB,
        ip_address VARCHAR(45) NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC')
      )
    `);

    // Create index on user_id for better join performance
    await query(`
      CREATE INDEX IF NOT EXISTS idx_credentials_user_id ON credentials(user_id);
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
