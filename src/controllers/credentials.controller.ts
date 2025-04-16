import { query } from "@/config/database.js";
import { CredentialInput } from "@/models/credentials.model.js";
import { Request, Response } from "express";

export async function addCredentialController(
  req: Request<CredentialInput>,
  res: Response
) {
  const { label, userName, email, password, url } = req.body;
}
