import { query } from "../config/database.js";

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

export interface CredentialList {
  id: string;
  label: string;
  url: string;
}

export interface CredentialInput {
  label: string;
  username: string;
  password: string;
  url: string;
  user_id: string;
}

export async function addCredentialsModel(body: CredentialInput) {
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

export async function getUserCredentialsModel(user_id: string) {
  const queryText = `SELECT id, label, url FROM credentials WHERE user_id = $1`;
  const { rows } = await query(queryText, [user_id]);
  return rows;
}

export async function getCredentialDetailsModel(credentialId: string) {
  const queryText = `SELECT * FROM credentials WHERE id = $1`;
  const { rows } = await query(queryText, [credentialId]);
  return rows[0];
}

export async function updateCredentialsModel(
  user_id: string,
  body: CredentialInput
) {}

export async function deleteCredentials(user_id: string) {}
