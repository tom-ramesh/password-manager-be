import { generateToken } from "../utils/jwt.js";
import { UserWithoutPassword } from "../models/user.model.js";
import { getUserByEmail, ServiceResult } from "./user.service.js";
import { comparePasswords } from "../utils/encryption.js";

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
    const isPasswordValid = await comparePasswords(password, user?.password!);
    if (!user || !isPasswordValid) {
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
