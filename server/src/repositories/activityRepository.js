import Activity from "../models/Activity.js";

export async function create(data) {
  return Activity.create(data);
}

export async function listForBoard(boardId) {
  return Activity.find({ boardId }).sort({ at: -1 });
}