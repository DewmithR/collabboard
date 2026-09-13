import * as userRepository from '../repositories/userRepository.js'

export async function searchUsers(query) {
  const q = String(query || '').trim()
  if (!q) return []

  const users = await userRepository.search(q)
  return users.map((user) => userRepository.publicUser(user))
}