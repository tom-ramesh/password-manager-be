import { verifyToken } from "../middleware/authMiddleware.js";
import {
  addCredentialsController,
  getCredentialDetailsController,
  getUserCredentialsController,
} from "../controllers/credentials.controller.js";
import express from "express";

const credentialsRoutes = express.Router();

credentialsRoutes.post("/add", verifyToken, addCredentialsController);
credentialsRoutes.get("/:id", verifyToken, getUserCredentialsController);
credentialsRoutes.get(
  "/details/:credential_id",
  verifyToken,
  getCredentialDetailsController
);

export default credentialsRoutes;
