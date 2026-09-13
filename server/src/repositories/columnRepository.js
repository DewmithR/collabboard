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

export async function update(boardId, columnId, columnData) {
  const board = await Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId },
    { $set: { "columns.$.title": columnData.title } },
    { new: true }
  );
  if (!board) return null;
  return board.columns.find((c) => String(c._id) === String(columnId)) || null;
}

export async function remove(boardId, columnId) {
  return Board.findByIdAndUpdate(
    boardId,
    { $pull: { columns: { _id: columnId } } },
    { new: true }
  );
}
