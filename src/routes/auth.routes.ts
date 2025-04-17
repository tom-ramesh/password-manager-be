import { register } from "../controllers/user.controller.js";
import { login } from "../controllers/auth.controller.js";
import express from "express";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
