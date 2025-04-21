import { decryptValue, encryptValue } from "../utils/encryption.js";
import {
  addCredentialsModel,
  CredentialInput,
  deleteCredentialModel,
  getCredentialDetailsModel,
  getUserCredentialsModel,
  updateCredentialModel,
} from "../models/credentials.model.js";
import { addLogModel } from "../models/logs.model.js";
import { LOGS_ACTION_TYPE } from "../types/enums/logs.enum.js";
import { addLogService } from "./logs.service.js";
import { pool } from "../config/database.js";

export async function addCredentialsService(data: CredentialInput) {
  try {
    const encryptedData = {
      ...data,
      password: encryptValue(data.password),
    };

    const result = await addCredentialsModel(encryptedData);
    if (result) {
      const logData = {
        userId: data.userId,
        credentialId: result?.id,
        actionType: LOGS_ACTION_TYPE.CREATE,
        oldData: null,
        newData: encryptedData,
        ipAddress: "",
      };
      await addLogModel(logData);
    }
    return { success: true, data: result, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        "Error adding credentials: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
}

export async function getUserCredentialsService(userId: string) {
  try {
    const result = await getUserCredentialsModel(userId);

    if (!result || result.length === 0) {
      return { success: true, data: [], error: null };
    }

    return { success: true, data: result, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        "Error fetching credentials: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
}

export async function getCredentialDetailsService(credentialId: string) {
  try {
    const result = await getCredentialDetailsModel(credentialId);
    if (!result) {
      return { success: false, data: null, error: "Credential not found" };
    }
    const decryptedData = {
      ...result,
      password: decryptValue(result.password),
    };
    return { success: true, data: decryptedData, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        "Error fetching credential details: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
}

export async function updateCredentialService(
  credentialId: string,
  data: CredentialInput
) {
  try {
    const encryptedData = {
      ...data,
      password: encryptValue(data.password),
    };
    const result = await updateCredentialModel(credentialId, encryptedData);

    if (!result) {
      return {
        success: false,
        data: null,
        error: "Failed to update credential",
      };
    }

    const existingCredential = await getCredentialDetailsModel(credentialId);
    if (!existingCredential) {
      return {
        success: false,
        data: null,
        error: "Credential not found",
      };
    }
    Object.assign(encryptedData, {
      createdAt: existingCredential.created_at,
      updatedAt: result.updated_at,
    });
    // Create log entry
    const logData = {
      userId: existingCredential.user_id,
      credentialId: result.id,
      actionType: LOGS_ACTION_TYPE.UPDATE,
      oldData: existingCredential,
      newData: encryptedData,
      ipAddress: "",
    };
    await addLogService(logData);
    return {
      success: true,
      data: result,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        "Error updating credential: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
}

export async function deleteCredentialService(credentialId: string) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const existingCredential = await getCredentialDetailsModel(credentialId);
    if (!existingCredential) {
      await client.query("ROLLBACK");
      return {
        success: false,
        data: null,
        error: "Credential not found",
      };
    }

    const logData = {
      userId: existingCredential.user_id,
      credentialId: existingCredential.id,
      actionType: LOGS_ACTION_TYPE.DELETE,
      oldData: existingCredential,
      newData: null,
      ipAddress: "",
    };
    await addLogService(logData);

    const result = await deleteCredentialModel(credentialId);
    if (!result) {
      await client.query("ROLLBACK");
      return {
        success: false,
        data: null,
        error: "Failed to delete credential",
      };
    }

    await client.query("COMMIT");
    return { success: true, data: result, error: null };
  } catch (error) {
    await client.query("ROLLBACK");
    return {
      success: false,
      data: null,
      error:
        "Error in delete operation: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  } finally {
    client.release();
  }
}
