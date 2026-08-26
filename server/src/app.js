import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { requestLogger } from "./middleware/requestLogger.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import { authenticate } from "./middleware/authenticate.js";
<<<<<<< HEAD
import columnRoutes from "./routes/columnRoutes.js";
=======
>>>>>>> origin/main

const app = express();
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(requestLogger);
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.use("/api/auth", authRoutes);
// Other routers will be mounted here as teammates finish their pieces.
app.use("/api/boards", authenticate, boardRoutes);
<<<<<<< HEAD
app.use("/api/boards/:boardId/columns", authenticate, columnRoutes);
=======
>>>>>>> origin/main

// 404 handler must come after all routes.
app.use(notFoundHandler);
// Error handler MUST be registered last.
app.use(errorHandler);

export default app;