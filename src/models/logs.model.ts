import { TLOG_ACTION_TYPE } from "../types/enums/logs.enum.js";
import { query } from "../config/database.js";

export interface ILogInput {
  userId: string;
  credentialId: string;
  actionType: TLOG_ACTION_TYPE;
  oldData: any;
  newData: any;
  ipAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function addLogModel(body: ILogInput) {
  const { userId, credentialId, actionType, oldData, newData, ipAddress } =
    body;
  const queryText = `INSERT INTO logs (user_id, credential_id, action, old_data, new_data, ip_address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  const { rows } = await query(queryText, [
    userId,
    credentialId,
    actionType,
    oldData,
    newData,
    ipAddress,
  ]);

  return rows[0];
}

export async function getLogsModel(userId: string) {
  const queryText = `SELECT * FROM logs WHERE user_id = $1`;
  const { rows } = await query(queryText, [userId]);
  return rows;
}
