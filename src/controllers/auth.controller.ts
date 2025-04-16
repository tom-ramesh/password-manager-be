import { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function register(
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> {
  const result = await authService.createUser(req.body);

  if (result.success) {
    res
      .status(201)
      .json(successResponse(result.data, "User registered successfully"));
  } else {
    res.status(400).json(errorResponse(result.error || "Unknown error", 400));
  }
}

export async function login(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json(errorResponse("Email and password are required", 400));
    return;
  }

  const result = await authService.loginUser(email, password);

  if (result.success) {
    res.status(200).json(successResponse(result.data, "Login successful"));
  } else {
    res.status(401).json(errorResponse(result.error || "Unknown error", 401));
  }
}
