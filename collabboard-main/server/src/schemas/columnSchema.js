import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createColumnSchema = z.object({
  title: z.string().trim().min(1, 'Column title is required'),
  boardId: objectIdSchema,
});

export const updateColumnSchema = createColumnSchema.partial();