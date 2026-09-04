import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    at: { type: Date, default: Date.now },
  }
);

activitySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Activity", activitySchema);