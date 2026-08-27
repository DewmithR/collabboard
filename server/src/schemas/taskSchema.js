import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().optional(),
  columnId: z.string(),
  assigneeId: z.string().optional(),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  dueDate: z.string().optional(),
})

export const updateTaskSchema = createTaskSchema.partial()