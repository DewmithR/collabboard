import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    columnId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
    priority: { type: String, enum: ["low", "normal", "high"], default: "normal" },
    dueDate: { type: Date },
    position: { type: Number, default: 0 },
    version: { type: Number, default: 0 },
  },
  { timestamps: true }
);

taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Task", taskSchema);