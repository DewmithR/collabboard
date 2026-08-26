import { boards } from "../data/seed.js";

export async function findAll() {
  return [...boards];
}

export async function findByUser(userId) {
  return boards.filter(
    (b) => b.ownerId === userId || b.memberIds.includes(userId)
  );
}

export async function findById(id) {
  return boards.find((b) => b.id === id) || null;
}

export async function create({ name, ownerId }) {
  const newBoard = {
    id: `b${boards.length + 1}`,
    name,
    ownerId,
    memberIds: [ownerId],
  };
  boards.push(newBoard);
  return newBoard;
}