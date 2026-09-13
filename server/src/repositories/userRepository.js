import { User } from '../models/User.js'

export async function findById(id) {
  return await User.findById(id)
}

export async function findByEmail(email) {
  return await User.findOne({ email })
}

export async function list() {
  return await User.find({})
}

export async function search(query) {
  const regex = new RegExp(query, 'i')
  return await User.find({
    $or: [{ name: regex }, { email: regex }],
  })
    .limit(8)
    .select('name email')
}

export async function findByIds(ids) {
  return await User.find({ _id: { $in: ids } })
}

export async function create(userData) {
  const user = new User(userData)
  return await user.save()
}

export function publicUser(user) {
  if (!user) return null
  return user.toJSON ? user.toJSON() : user
}