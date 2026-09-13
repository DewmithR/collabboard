import * as taskRepository from '../repositories/taskRepository.js'
import { findById as findBoardById } from '../repositories/boardRepository.js'
import { NotFoundError, ForbiddenError, AppError } from '../utils/AppError.js'
async function assertBoardMember(boardId, userId) {
const board = await findBoardById(boardId)
if (!board) throw new NotFoundError('Board')
const isMember = board.ownerId === userId || board.members.some((m) => String(m.userId) === String(userId))
if (!isMember) throw new ForbiddenError('You are not a member of this board')
return board
}
async function assertMemberAssignable(board, assigneeId) {
if (!assigneeId) return
const isMember =
  board.ownerId === assigneeId ||
  board.members.some((m) => String(m.userId) === String(assigneeId))
if (!isMember) {
  throw new AppError(
    'Assignee is not a member of this board',
    400,
    'INVALID_ASSIGNEE'
  )
}
}
export async function listForBoard(boardId, userId, filters = {}) {
await assertBoardMember(boardId, userId)
let result = await taskRepository.findByBoard(boardId)
if (filters.columnId) result = result.filter(t => String(t.columnId) === String(filters.columnId))
if (filters.assigneeId) result = result.filter(t => String(t.assigneeId) === String(filters.assigneeId))
return result
}
export async function createTask(userId, data) {
const board = await assertBoardMember(data.boardId, userId)
await assertMemberAssignable(board, data.assigneeId)
return taskRepository.create(data)
}
export async function updateTask(taskId, userId, changes) {
const task = await taskRepository.findById(taskId)
if (!task) throw new NotFoundError('Task')
const board = await assertBoardMember(task.boardId, userId)
await assertMemberAssignable(board, changes.assigneeId)
return taskRepository.update(taskId, changes)
}
export async function deleteTask(taskId, userId) {
const task = await taskRepository.findById(taskId)
if (!task) throw new NotFoundError('Task')
await assertBoardMember(task.boardId, userId)
const deleted = await taskRepository.remove(taskId)
if (!deleted) throw new NotFoundError('Task')
}