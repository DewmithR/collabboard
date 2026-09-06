import { Router } from 'express'
import * as controller from '../controllers/columnController.js'
import { validate } from '../middleware/validate.js'
import { createColumnSchema } from '../schemas/columnSchema.js'

const router = Router({ mergeParams: true })

router.get('/', controller.list)
router.post('/', validate(createColumnSchema), controller.create)

export default router