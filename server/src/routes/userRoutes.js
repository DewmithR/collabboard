import { Router } from 'express'
import * as controller from '../controllers/userController.js'

const router = Router()

router.get('/search', controller.search)

export default router