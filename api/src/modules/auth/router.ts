import express from 'express'
import controller from './controller'
import { authMiddleware } from '../../middlewares/auth.middleware'
const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/resetPassword', controller.resetPassword)
router.post('/resetPasswordPost', controller.resetPasswordPost)
router.post('/activate', controller.activate)
router.get('/refresh', authMiddleware, controller.refresh)
router.post('/logout', authMiddleware, controller.logout)

export default router