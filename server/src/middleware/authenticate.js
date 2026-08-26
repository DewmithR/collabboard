import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { AppError } from "../utils/AppError.js";

export function authenticate(req, res, next) {
  const header = req.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Authentication required", 401, "NO_TOKEN"));
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    const expired = err.name === "TokenExpiredError";
    next(
      new AppError(
        expired ? "Token expired" : "Invalid token",
        401,
        expired ? "TOKEN_EXPIRED" : "BAD_TOKEN",
      ),
    );
  }
}
