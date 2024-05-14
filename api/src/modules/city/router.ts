import express from 'express'
import controller from './controller'
import { adminMiddleware } from '../../middlewares/admin.middleware'

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.post('/',adminMiddleware, controller.create)
router.put('/', adminMiddleware,controller.update)
router.delete('/:id', adminMiddleware,controller.delete)

export default router