import { z } from 'zod'
import mongoose from 'mongoose'

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
  })

export const createTaskSchema = z.object({
  boardId: objectIdSchema,
  title: z.string().trim().min(3),
  description: z.string().optional(),
  columnId: z.string(),
  assigneeId: z.string().optional().nullable(),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  dueDate: z.string().optional(),
})

export const updateTaskSchema = createTaskSchema.partial()