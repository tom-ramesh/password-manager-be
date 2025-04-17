import { CredentialInput } from "../models/credentials.model.js";
import {
  addCredentialsService,
  deleteCredentialService,
  getCredentialDetailsService,
  getUserCredentialsService,
  updateCredentialService,
} from "../services/credentials.service.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { Request, Response } from "express";

export async function addCredentialsController(
  req: Request<{}, {}, CredentialInput>,
  res: Response
) {
  const result = await addCredentialsService(req.body);

  if (result.success) {
    res
      .status(201)
      .json(successResponse(result.data, "Credential added successfully"));
  } else {
    res.status(400).json(errorResponse(result.error || "Unknown error", 400));
  }
}

export async function getUserCredentialsController(
  req: Request<{ id: string }>,
  res: Response
) {
  const result = await getUserCredentialsService(req.params.id);

  if (result.success) {
    res.status(200).json(successResponse(result.data));
  } else {
    res.status(400).json(errorResponse(result.error || "Unknown error", 400));
  }
}

export async function getCredentialDetailsController(
  req: Request<{ credentialId: string }>,
  res: Response
) {
  const result = await getCredentialDetailsService(req.params.credentialId);

  if (result.success) {
    res.status(200).json(successResponse(result.data));
  } else {
    res.status(400).json(errorResponse(result.error || "Unknown error", 400));
  }
}

export async function updateCredentialController(
  req: Request<{ credentialId: string }, {}, CredentialInput>,
  res: Response
) {
  const result = await updateCredentialService(
    req.params.credentialId,
    req.body
  );

  if (result.success) {
    res.status(200).json(successResponse(result.data));
  } else {
    res.status(400).json(errorResponse(result.error || "Unknown error", 400));
  }
}

export async function deleteCredentialController(
  req: Request<{ credentialId: string }>,
  res: Response
) {
  const result = await deleteCredentialService(req.params.credentialId);

  if (result.success) {
    res.status(200).json(successResponse(result.data));
  } else {
    res.status(400).json(errorResponse(result.error || "Unknown error", 400));
  }
}
