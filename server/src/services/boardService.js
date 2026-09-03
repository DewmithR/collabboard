import * as boardRepository from "../repositories/boardRepository.js";
import { NotFoundError, ForbiddenError, ValidationError } from "../utils/AppError.js";

export async function listForUser(userId) {
  return boardRepository.findByUser(userId);
}

export async function create(userId, data) {
  if (!data.name || !data.name.trim()) {
    throw new ValidationError([{ message: "Board name is required" }]);
  }
  return boardRepository.create({ name: data.name.trim(), ownerId: userId });
}

export async function getForUser(boardId, userId) {
  const board = await boardRepository.findById(boardId);
  if (!board) throw new NotFoundError("Board");
  const isMember =
    board.ownerId === userId ||
    board.members.some((m) => m.userId === userId);
  if (!isMember) throw new ForbiddenError();
  return board;
}