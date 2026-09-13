import mongoose from "mongoose";
import * as boardService from "../services/boardService.js";
import { AppError } from "../utils/AppError.js";

export async function list(req, res) {
  const boards = await boardService.listForUser(req.user.id);
  res.json({ data: boards });
}

export async function create(req, res) {
  const board = await boardService.create(req.user.id, req.body);
  res.status(201).json({ data: board });
}

function assertValidBoardId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Board not found", 404, "NOT_FOUND");
  }
}

export async function getOne(req, res) {
  assertValidBoardId(req.params.id);

  const board = await boardService.getForUser(req.params.id, req.user.id);
  res.json({ data: board });
}

export async function update(req, res) {
  assertValidBoardId(req.params.id);

  const board = await boardService.update(req.params.id, req.user.id, req.body);
  res.status(200).json({ data: board });
}

export async function remove(req, res) {
  assertValidBoardId(req.params.id);

  await boardService.remove(req.params.id, req.user.id);
  res.status(204).end();
}

export async function listMembers(req, res) {
  assertValidBoardId(req.params.id);

  const members = await boardService.listMembers(req.params.id, req.user.id);
  res.json({ data: members });
}

export async function addMember(req, res) {
  assertValidBoardId(req.params.id);

  const members = await boardService.addMember(
    req.params.id,
    req.user.id,
    req.body.userId
  );
  res.json({ data: members });
}

export async function removeMember(req, res) {
  assertValidBoardId(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(req.params.memberId)) {
    throw new AppError("Board member not found", 404, "NOT_FOUND");
  }

  const members = await boardService.removeMember(
    req.params.id,
    req.user.id,
    req.params.memberId
  );
  res.json({ data: members });
}