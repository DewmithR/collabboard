import app from "./app.js";
import { config } from "./config.js";
import { connectDb } from "./db/connect.js";

await connectDb();

app.listen(config.port, () => {
  console.log(`CollabBoard server running on port ${config.port}`);
});
