import * as taskRepository from '../repositories/taskRepository.js'
import { findById as findBoardById } from '../repositories/boardRepository.js'
import { NotFoundError, ForbiddenError } from '../utils/AppError.js'
async function assertBoardMember(boardId, userId) {
const board = await findBoardById(boardId)
if (!board) throw new NotFoundError('Board')
const isMember = board.ownerId === userId || board.memberIds?.includes(userId)
if (!isMember) throw new ForbiddenError('You are not a member of this board')
return board
}
export async function listForBoard(boardId, userId, filters = {}) {
await assertBoardMember(boardId, userId)
let result = await taskRepository.findByBoard(boardId)
if (filters.columnId) result = result.filter(t => t.columnId === filters.columnId)
if (filters.assigneeId) result = result.filter(t => t.assigneeId === filters.assigneeId)
return result
}
export async function createTask(userId, data) {
await assertBoardMember(data.boardId, userId)
return taskRepository.create(data)
}
export async function updateTask(taskId, userId, changes) {
const task = await taskRepository.findById(taskId)
if (!task) throw new NotFoundError('Task')
await assertBoardMember(task.boardId, userId)
return taskRepository.update(taskId, changes)
}
export async function deleteTask(taskId, userId) {
const task = await taskRepository.findById(taskId)
if (!task) throw new NotFoundError('Task')
await assertBoardMember(task.boardId, userId)
const deleted = await taskRepository.remove(taskId)
if (!deleted) throw new NotFoundError('Task')
}