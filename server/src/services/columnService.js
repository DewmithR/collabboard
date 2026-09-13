import * as columnRepository from "../repositories/columnRepository.js";
import * as boardService from "./boardService.js";
import * as taskRepository from "../repositories/taskRepository.js";
import { NotFoundError } from "../utils/AppError.js";

export async function listForBoard(boardId) {
  return await columnRepository.findByBoard(boardId);
}

export async function createColumn(boardId, data) {
  return await columnRepository.create(boardId, {
    title: data.title,
    position: data.position ?? 0
  });
}

export async function updateColumn(boardId, columnId, userId, data) {
  await boardService.getForUser(boardId, userId);
  const updated = await columnRepository.update(boardId, columnId, data);
  if (!updated) throw new NotFoundError("Column");
  return updated;
}

export async function removeColumn(boardId, columnId, userId) {
  await boardService.getForUser(boardId, userId);
  const board = await columnRepository.remove(boardId, columnId);
  if (!board) throw new NotFoundError("Board");
  await taskRepository.removeByColumn(boardId, columnId);
}