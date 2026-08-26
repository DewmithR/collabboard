import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { requestLogger } from "./middleware/requestLogger.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/errorHandler.js";
import boardRoutes from "./routes/boardRoutes.js";
import { tempAuthStub } from "./middleware/tempAuthStub.js";

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

// Other routers will be mounted here as teammates finish their pieces.
app.use("/api/boards", tempAuthStub, boardRoutes);

// 404 handler must come after all routes.
app.use(notFoundHandler);
// Error handler MUST be registered last.
app.use(errorHandler);

export default app;