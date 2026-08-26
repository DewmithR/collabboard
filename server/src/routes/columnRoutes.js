import { Router } from 'express'
import * as controller from '../controllers/columnController.js'

const router = Router({ mergeParams: true })

router.get('/', controller.list)
router.post('/', controller.create)

export default router