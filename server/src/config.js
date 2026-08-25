import "dotenv/config";

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};