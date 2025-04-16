import { query } from "@/config/database.js";

export interface Credential {
  id: string;
  label: string;
  username: string;
  password: string;
  url: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CredentialInput {
  label: string;
  username: string;
  password: string;
  url: string;
  user_id: string;
}

export async function addCredentials(body: CredentialInput) {
  const { label, username, password, url, user_id } = body;
  const queryText = `INSERT INTO credentials (label, username, password, url, user_id) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, label, username, url, user_id, created_at, updated_at`;
  const { rows } = await query(queryText, [
    label,
    username,
    password,
    url,
    user_id,
  ]);
  return rows[0];
}

export async function getCredentials(user_id: string) {}

export async function updateCredentials(
  user_id: string,
  body: CredentialInput
) {}

export async function deleteCredentials(user_id: string) {}
