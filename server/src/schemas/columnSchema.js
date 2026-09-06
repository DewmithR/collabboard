import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createColumnSchema = z.object({
  name: z.string().trim().min(1, 'Column name is required'),
  boardId: objectIdSchema.optional(),
  order: z.number().int().min(0).optional(),
});

export const updateColumnSchema = createColumnSchema.partial();