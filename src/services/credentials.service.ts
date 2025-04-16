import { addCredentials, CredentialInput } from "@/models/credentials.model.js";

export async function addCredentialsService(data: CredentialInput) {
  try {
    const result = await addCredentials(data);
    return { success: true, data: result, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Error adding credentials" + (error as Error).message,
    };
  }
}
