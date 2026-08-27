import { tasks } from '../data/seed.js'
export async function findAll() {
return tasks
}
export async function findById(id) {
return tasks.find(t => t.id === id) || null
}
export async function findByBoard(boardId) {
return tasks.filter(t => t.boardId === boardId)
}
export async function create(taskData) {
const now = new Date().toISOString()
const newTask = {
id: `t${tasks.length + 1}`,
...taskData,
createdAt: now,
updatedAt: now,
}
tasks.push(newTask)
return newTask
}
export async function update(id, changes) {
const index = tasks.findIndex(t => t.id === id)
if (index === -1) return null
tasks[index] = { ...tasks[index], ...changes, updatedAt: new Date().toISOString() }
return tasks[index]
}
export async function remove(id) {
const index = tasks.findIndex(t => t.id === id)
if (index === -1) return false
tasks.splice(index, 1)
return true
}