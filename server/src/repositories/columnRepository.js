import { columns } from '../data/seed.js'

export async function findByBoard(boardId) {
  return columns.filter(col => col.boardId === boardId)
}

export async function create(columnData) {
  const newColumn = {
    id: `c${columns.length + 1}`,
    ...columnData
  }
  columns.push(newColumn)
  return newColumn
}