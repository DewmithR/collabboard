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

export async function pushMember(boardId, member) {
  return Board.findByIdAndUpdate(
    boardId,
    { $push: { members: member } },
    { new: true }
  );
}

export async function pullMember(boardId, userId) {
  return Board.findByIdAndUpdate(
    boardId,
    { $pull: { members: { userId } } },
    { new: true }
  );
}

export async function update(id, changes) {
  return Board.findByIdAndUpdate(id, changes, { new: true });
}

export async function remove(id) {
  return Board.findByIdAndDelete(id);
}