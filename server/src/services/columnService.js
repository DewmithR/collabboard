import * as columnRepository from '../repositories/columnRepository.js'

export async function listForBoard(boardId) {
  return await columnRepository.findByBoard(boardId)
}

export async function createColumn(boardId, data) {
  return await columnRepository.create({
    boardId,
    name: data.name,
    order: data.order ?? 0
  })
}