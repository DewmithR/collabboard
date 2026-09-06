import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Task title is required'),
  description: z.string().optional(),
  boardId: objectIdSchema,
  columnId: objectIdSchema,
  assigneeId: objectIdSchema.optional(),
});

export const updateTaskSchema = createTaskSchema.partial();