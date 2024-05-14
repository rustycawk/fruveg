import express from 'express'
import authRouter from './modules/auth/router'
import porductTypeRouter from './modules/productType/router'
import productRouter from './modules/product/router'
import cityRouter from './modules/city/router'
import cityDistrictRouter from './modules/cityDistrict/router'
import profileRouter from './modules/profile/router'
import orderStatusRouter from './modules/orderStatus/router'
import basketRouter from './modules/basket/router'
import catalogRouter from './modules/catalog/router'

import { authMiddleware } from './middlewares/auth.middleware'
import { adminMiddleware } from './middlewares/admin.middleware'

const router = express.Router()

router.use('/auth', authRouter)

router.use('/productType',authMiddleware, adminMiddleware, porductTypeRouter)
router.use('/product', authMiddleware, adminMiddleware, productRouter)
router.use('/city', authMiddleware, cityRouter)
router.use('/cityDistrict', authMiddleware, adminMiddleware, cityDistrictRouter)
router.use('/profile', authMiddleware, profileRouter)
router.use('/orderStatus', authMiddleware, adminMiddleware, orderStatusRouter)
router.use('/basket', authMiddleware, basketRouter)
router.use('/catalog', catalogRouter)

export default router