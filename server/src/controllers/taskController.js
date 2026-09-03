import mongoose from 'mongoose'
import * as taskService from '../services/taskService.js'

function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      error: {
        message: 'Task not found',
        code: 'NOT_FOUND',
        details: null,
      },
    })

    return false
  }

  return true
}

export async function list(req, res) {
  const { boardId } = req.params
  const { columnId, assigneeId } = req.query

  const tasks = await taskService.listForBoard(
    boardId,
    req.user.id,
    { columnId, assigneeId }
  )

  res.status(200).json({ data: tasks })
}

export async function create(req, res) {
  const task = await taskService.createTask(req.user.id, req.body)

  res.status(201).json({ data: task })
}

export async function update(req, res) {
  if (!validateObjectId(req.params.id, res)) {
    return
  }

  const task = await taskService.updateTask(
    req.params.id,
    req.user.id,
    req.body
  )

  res.status(200).json({ data: task })
}

export async function remove(req, res) {
  if (!validateObjectId(req.params.id, res)) {
    return
  }

  await taskService.deleteTask(req.params.id, req.user.id)

  res.status(204).end()
}