import { query } from "../config/database.js";

export interface Credential {
  id: string;
  label: string;
  username: string;
  password: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
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
  userId: string;
}

export async function addCredentialsModel(body: CredentialInput) {
  const { label, username, password, url, userId } = body;
  const queryText = `INSERT INTO credentials (label, username, password, url, user_id) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, label, username, url, user_id, created_at, updated_at`;
  const { rows } = await query(queryText, [
    label,
    username,
    password,
    url,
    userId,
  ]);
  return rows[0];
}

export async function getUserCredentialsModel(userId: string) {
  const queryText = `SELECT id, label, url FROM credentials WHERE user_Id = $1`;
  const { rows } = await query(queryText, [userId]);
  return rows;
}

export async function getCredentialDetailsModel(credentialId: string) {
  const queryText = `SELECT * FROM credentials WHERE id = $1`;
  const { rows } = await query(queryText, [credentialId]);
  return rows[0];
}

export async function updateCredentialModel(
  credentialId: string,
  body: CredentialInput
) {
  const { label, username, password, url } = body;
  const queryText = `UPDATE credentials 
      SET label = $1, username = $2, password = $3, url = $4, updated_at = NOW() AT TIME ZONE 'UTC'
      WHERE id = $5 
      RETURNING id, created_at, updated_at`;

  const { rows } = await query(queryText, [
    label,
    username,
    password,
    url,
    credentialId,
  ]);

  return rows[0];
}

export async function deleteCredentialModel(credentialId: string) {
  const queryText = `DELETE FROM credentials WHERE id = $1 RETURNING id`;
  const { rows } = await query(queryText, [credentialId]);
  console.log("rows", rows);
  return rows[0];
}
