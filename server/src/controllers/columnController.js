import mongoose from "mongoose";
import * as columnService from "../services/columnService.js";
import { AppError } from "../utils/AppError.js";

function assertValidColumnId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Column not found", 404, "NOT_FOUND");
  }
}

export async function list(req, res, next) {
  try {
    const columns = await columnService.listForBoard(req.params.boardId);
    res.json({ data: columns });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const column = await columnService.createColumn(req.params.boardId, req.body);
    res.status(201).json({ data: column });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res) {
  assertValidColumnId(req.params.columnId);

  const column = await columnService.updateColumn(
    req.params.boardId,
    req.params.columnId,
    req.user.id,
    req.body
  );

  res.status(200).json({ data: column });
}

export async function remove(req, res) {
  assertValidColumnId(req.params.columnId);

  await columnService.removeColumn(
    req.params.boardId,
    req.params.columnId,
    req.user.id
  );

  res.status(204).end();
}