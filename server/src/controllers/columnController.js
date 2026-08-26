import * as columnService from '../services/columnService.js'

export async function list(req, res, next) {
  try {
    const columns = await columnService.listForBoard(req.params.boardId)
    res.json({ data: columns })
  } catch (error) {
    next(error)
  }
}

export async function create(req, res, next) {
  try {
    const column = await columnService.createColumn(req.params.boardId, req.body)
    res.status(201).json({ data: column })
  } catch (error) {
    next(error)
  }
}