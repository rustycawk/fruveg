import express from 'express'
import controller from './controller'

const router = express.Router();

router.get('/productTypes', controller.getProductTypes)
router.post('/products', controller.getProducts)
router.get('/products/:id', controller.getProduct)

export default router;