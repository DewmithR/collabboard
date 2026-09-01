import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import { authenticate } from "./middleware/authenticate.js";
import columnRoutes from "./routes/columnRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import boardTaskRoutes from "./routes/boardTaskRoutes.js";

const app = express();
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(requestLogger);
app.get("/api/health", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];

  res.json({
    status: "ok",
    uptime: process.uptime(),
    db: dbStates[mongoose.connection.readyState] ?? "unknown",
  });
});

app.use("/api/auth", authRoutes);
// Other routers will be mounted here as teammates finish their pieces.
app.use("/api/boards", authenticate, boardRoutes);
app.use("/api/boards/:boardId/columns", authenticate, columnRoutes);
app.use("/api/tasks", authenticate, taskRoutes);
app.use("/api/boards/:boardId/tasks", authenticate, boardTaskRoutes);

// 404 handler must come after all routes.
app.use(notFoundHandler);
// Error handler MUST be registered last.
app.use(errorHandler);

export default app;
