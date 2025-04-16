import { generateToken } from "../utils/jwt.js";
import {
  UserInput,
  UserWithoutPassword,
  createUser as createUserModel,
} from "../models/user.model.js";
import { getUserByEmail, ServiceResult } from "./user.service.js";

export async function createUser(
  userData: UserInput
): Promise<ServiceResult<UserWithoutPassword>> {
  try {
    // Add any business logic/validation here
    const user = await createUserModel(userData);
    return { success: true, data: user, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Error creating user: " + (error as Error).message,
    };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<ServiceResult<UserWithoutPassword>> {
  try {
    // Find user by email
    const userResult = await getUserByEmail(email);

    if (!userResult.success) {
      return { success: false, data: null, error: "Invalid email or password" };
    }

    const user = userResult.data;

    if (!user || user.password !== password) {
      return { success: false, data: null, error: "Invalid email or password" };
    }

    const token = generateToken({ id: user.id, email: user.email });
    const userWithToken = { ...user, token };
    const { password: _, ...userWithoutPassword } = userWithToken;

    return { success: true, data: userWithoutPassword, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Login error: " + (error as Error).message,
    };
  }
}
