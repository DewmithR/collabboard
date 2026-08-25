import app from "./app.js";
import { config } from "./config.js";

app.listen(config.port, () => {
  console.log(`CollabBoard server running on port ${config.port}`);
});