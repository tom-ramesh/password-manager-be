import * as userModel from "../models/user.model.js";

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  created_at: Date;
}

interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface ServiceResult<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export async function getUserById(id: number): Promise<ServiceResult<User>> {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return { success: false, data: null, error: "User not found" };
    }
    return { success: true, data: user, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Error finding user: " + (error as Error).message,
    };
  }
}

export async function getUserByEmail(
  email: string
): Promise<ServiceResult<User>> {
  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      return { success: false, data: null, error: "User not found" };
    }
    return { success: true, data: user, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Error finding user: " + (error as Error).message,
    };
  }
}
