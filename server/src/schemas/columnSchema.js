import { z } from "zod"

export const createColumnSchema = z.object({
  title: z.string().trim().min(1, "Column title is required"),
  position: z.number().int().min(0).optional(),
})
