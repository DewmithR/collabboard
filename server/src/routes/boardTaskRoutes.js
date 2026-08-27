import { Router } from 'express'
import * as controller from '../controllers/taskController.js'
const router = Router({ mergeParams: true })
router.get('/', controller.list)
export default router