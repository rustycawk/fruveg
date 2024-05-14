import express from 'express'
import controller from './controller'
const router = express.Router();

router.post('/makeOrder', controller.makeOrder)
router.get('/orders', controller.getOrders)
router.get('/orders/:id', controller.getOrder)

export default router;