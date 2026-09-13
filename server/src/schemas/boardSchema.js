import { z } from 'zod'
import mongoose from 'mongoose'

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
  })

export const createBoardSchema = z.object({
  name: z.string().trim().min(1, 'Board name is required'),
})

export const addBoardMemberSchema = z.object({
  userId: objectIdSchema,
})