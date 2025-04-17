import crypto from "crypto";
import bcrypt from "bcrypt";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_SECRET_KEY || "", "hex");
if (key.length !== 32) {
  throw new Error("ENCRYPTION_SECRET_KEY must be a 32-byte hex string");
}
const ivLength = 16;

export function encryptValue(text: string) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return Buffer.from(iv).toString("hex") + encrypted;
}

export function decryptValue(encrypted: string) {
  const iv = Buffer.from(encrypted.slice(0, ivLength * 2), "hex");
  const encryptedText = encrypted.slice(ivLength * 2);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}
