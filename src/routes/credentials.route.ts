import { login, register } from "../controllers/auth.controller.js";
import express from "express";

const credentialsRoutes = express.Router();

credentialsRoutes.post("/add", register);

export default credentialsRoutes;
