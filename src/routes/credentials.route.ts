import { verifyToken } from "../middleware/authMiddleware.js";
import {
  addCredentialsController,
  deleteCredentialController,
  getCredentialDetailsController,
  getUserCredentialsController,
  updateCredentialController,
} from "../controllers/credentials.controller.js";
import express from "express";

const credentialsRoutes = express.Router();

credentialsRoutes.post("/add", verifyToken, addCredentialsController);
credentialsRoutes.get("/:id", verifyToken, getUserCredentialsController);
credentialsRoutes.get(
  "/details/:credentialId",
  verifyToken,
  getCredentialDetailsController
);
credentialsRoutes.put(
  "/update/:credentialId",
  verifyToken,
  updateCredentialController
);
credentialsRoutes.delete(
  "/delete/:credentialId",
  verifyToken,
  deleteCredentialController
);

export default credentialsRoutes;
