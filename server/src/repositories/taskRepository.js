import Task from "../models/Task.js";

export async function findAll() {
  return Task.find();
}

export async function findById(id) {
  return Task.findById(id);
}

export async function findByBoard(boardId) {
  return Task.find({ boardId });
}

export async function create(taskData) {
  return Task.create(taskData);
}

export async function update(id, changes) {
  return Task.findByIdAndUpdate(id, changes, { new: true });
}

export async function remove(id) {
  const result = await Task.findByIdAndDelete(id);
  return Boolean(result);
}