import { AppError } from "../utils/AppError.js";

export function notFoundHandler(req, res, next) {
  next(
    new AppError(
      `Route ${req.method} ${req.originalUrl} not found`,
      404,
      "NOT_FOUND"
    )
  );
}

export function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal server error",
      code: err.code || "INTERNAL_ERROR",
      details: err.details || null,
    },
  });
}