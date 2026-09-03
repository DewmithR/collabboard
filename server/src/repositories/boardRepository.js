import Board from "../models/Board.js";

export async function findAll() {
  return Board.find({});
}

export async function findByUser(userId) {
  return Board.find({
    $or: [{ ownerId: userId }, { "members.userId": userId }],
  });
}

export async function findById(id) {
  return Board.findById(id);
}

export async function create({ name, ownerId }) {
  const newBoard = new Board({
    name,
    ownerId,
    members: [{ userId: ownerId, role: "owner" }],
  });
  return newBoard.save();
}