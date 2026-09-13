import * as userService from '../services/userService.js'

export async function search(req, res) {
  const users = await userService.searchUsers(req.query.q)
  res.json({ data: users })
}