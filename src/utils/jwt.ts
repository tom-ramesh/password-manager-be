import { User } from "@/models/user.model.js";
import jwt from "jsonwebtoken";

export const generateToken = (payload: Partial<User>) => {
  return jwt.sign(
    { id: payload.id, email: payload.email },
    process.env.JWT_SECRET ?? "",
    { expiresIn: "1h" }
  );
};
