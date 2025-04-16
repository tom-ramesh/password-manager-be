import { Request, Response } from "express";
import * as userService from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export async function getProfile(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const result = await userService.getUserById(parseInt(req.params.id, 10));

  if (result.success) {
    res.status(200).json(successResponse(result.data));
  } else {
    res.status(404).json(errorResponse(result.error || "Unknown error", 404));
  }
}
