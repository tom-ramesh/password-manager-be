import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import { successResponse } from "./utils/response.js";
import { initializeDatabase } from "./config/init-db.js";
import authRoutes from "./routes/auth.routes.js";
import credentialsRoutes from "./routes/credentials.route.js";

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT || "8080", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/credentials", credentialsRoutes);

// Basic route
app.get("/", (_req: Request, res: Response) => {
  res.json(successResponse({ message: "Welcome to the Password Manager API" }));
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json(successResponse({ status: "OK" }));
});

// Error handling
app.use(errorHandler);

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on a port ${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
