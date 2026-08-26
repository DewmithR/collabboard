import * as boardService from "../services/boardService.js";

export async function list(req, res) {
  const boards = await boardService.listForUser(req.user.id);
  res.json({ data: boards });
}

export async function create(req, res) {
  const board = await boardService.create(req.user.id, req.body);
  res.status(201).json({ data: board });
}

export async function getOne(req, res) {
  const board = await boardService.getForUser(req.params.id, req.user.id);
  res.json({ data: board });
}