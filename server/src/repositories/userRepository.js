import { users } from '../data/seed.js'

export async function findById(id) {
  return users.find(u => u.id === id) || null
}

export async function findByEmail(email) {
  return users.find(u => u.email === email) || null
}

export async function list() {
  return [...users]
}

export async function create(userData) {
  const newUser = { id: ⁠ u${users.length + 1} ⁠, ...userData }
  users.push(newUser)
  return newUser
}


export function publicUser(user) {
  if (!user) return null
  const { passwordHash, ...safeUser } = user
  return safeUser
}