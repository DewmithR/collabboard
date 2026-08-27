import { Router } from 'express'
import * as controller from '../controllers/taskController.js'
import { validate } from '../middleware/validate.js'
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema.js'
const router = Router()
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
export default router