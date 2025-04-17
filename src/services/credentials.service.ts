import { decryptValue, encryptValue } from "../utils/encryption.js";
import {
  addCredentialsModel,
  CredentialInput,
  getCredentialDetailsModel,
  getUserCredentialsModel,
} from "../models/credentials.model.js";

export async function addCredentialsService(data: CredentialInput) {
  try {
    const encryptedData = {
      ...data,
      password: encryptValue(data.password),
    };
    const result = await addCredentialsModel(encryptedData);
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

export async function getUserCredentialsService(user_id: string) {
  try {
    const result = await getUserCredentialsModel(user_id);

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
