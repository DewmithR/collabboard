import mongoose from "mongoose";

const columnSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    position: { type: Number, required: true },
  },
  { _id: true }
);

const memberSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "editor", "viewer"],
      default: "editor",
    },
  },
  { _id: false }
);

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    members: { type: [memberSchema], default: [] },
    columns: { type: [columnSchema], default: [] },
  },
  { timestamps: true }
);

boardSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
