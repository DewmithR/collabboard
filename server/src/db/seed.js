import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { connectDb } from "./connect.js";
import Board from "../models/Board.js";
import Task from "../models/Task.js";
import { User } from "../models/User.js";

async function seed() {
  await connectDb();

  
  await Promise.all([
    User.deleteMany({}),
    Board.deleteMany({}),
    Task.deleteMany({}),
  ]);

  
  const passwordHash = await bcrypt.hash("password123", 10);

  const [amanda, dulan, udara] = await User.create([
    { email: "amanda@collabboard.dev", passwordHash, name: "Amanda" },
    { email: "dulan@collabboard.dev", passwordHash, name: "Dulan" },
    { email: "udara@collabboard.dev", passwordHash, name: "Udara" },
  ]);

  
  const board = await Board.create({
    name: "CollabBoard Sprint 1",
    ownerId: amanda.id,
    members: [
      { userId: amanda.id, role: "owner" },
      { userId: dulan.id, role: "editor" },
      { userId: udara.id, role: "editor" },
    ],
    columns: [
      { title: "To Do", position: 0 },
      { title: "Doing", position: 1 },
      { title: "Done", position: 2 },
    ],
  });

  const [todoCol, doingCol, doneCol] = board.columns;

  
  await Task.create([
    {
      boardId: board.id,
      columnId: todoCol._id,
      title: "Set up repo",
      assigneeId: amanda.id,
      status: "todo",
      priority: "normal",
    },
    {
      boardId: board.id,
      columnId: todoCol._id,
      title: "Design DB schema",
      assigneeId: dulan.id,
      status: "todo",
      priority: "high",
    },
    {
      boardId: board.id,
      columnId: doingCol._id,
      title: "Build auth routes",
      assigneeId: udara.id,
      status: "doing",
      priority: "high",
    },
    {
      boardId: board.id,
      columnId: doingCol._id,
      title: "Write board CRUD",
      assigneeId: amanda.id,
      status: "doing",
      priority: "normal",
    },
    {
      boardId: board.id,
      columnId: doneCol._id,
      title: "Init project config",
      assigneeId: amanda.id,
      status: "done",
      priority: "low",
    },
  ]);

  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});