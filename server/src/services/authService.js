import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findByEmail,
  findById,
  create,
  publicUser,
} from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { config } from "../config.js";

export async function register({ name, email, password }) {
  const existing = await findByEmail(email);
  if (existing) {
    throw new AppError(
      "An account with this email already exists",
      409,
      "EMAIL_IN_USE",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await create({ name, email, passwordHash });

  return publicUser(user);
}

export async function login({ email, password }) {
  const user = await findByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401, "BAD_CREDENTIALS");
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401, "BAD_CREDENTIALS");
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: "1h" },
  );

  return { token, user: publicUser(user) };
}

export async function getCurrentUser(userId) {
  const user = await findById(userId);
  if (!user) {
    throw new AppError("User not found", 404, "NOT_FOUND");
  }

  return publicUser(user);
}
