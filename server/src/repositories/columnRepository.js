import Board from "../models/Board.js"

export async function findByBoard(boardId) {
  const board = await Board.findById(boardId)
  if (!board) {
    return null
  }
  return board.columns
}

export async function create(boardId, columnData) {
  const board = await Board.findById(boardId)
  if (!board) {
    return null
  }
  board.columns.push(columnData)
  await board.save()
  return board.columns[board.columns.length - 1]
}
