import { z } from 'zod'

export const createColumnSchema = z.object({
  name: z.string().trim().min(1, 'Column name is required'),
  order: z.number().int().min(0).optional(),
})