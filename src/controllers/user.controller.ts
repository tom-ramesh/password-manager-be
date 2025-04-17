import { Request, Response } from "express";
import * as userService from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export async function register(
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> {
  const result = await userService.createUser(req.body);

  if (result.success) {
    res
      .status(201)
      .json(successResponse(result.data, "User registered successfully"));
  } else {
    res.status(400).json(errorResponse(result.error || "Unknown error", 400));
  }
}

export async function getProfile(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const result = await userService.getUserById(req.params.id);

  if (result.success) {
    res.status(200).json(successResponse(result.data));
  } else {
    res.status(404).json(errorResponse(result.error || "Unknown error", 404));
  }
}
