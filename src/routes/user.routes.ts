import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authMiddleare.js";

const userRoutes = express.Router();

userRoutes.get("/:id", verifyToken, getProfile);

export default userRoutes;
