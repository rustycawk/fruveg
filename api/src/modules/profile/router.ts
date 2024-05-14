import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/',controller.getProfileInfo)
router.put('/baseInfo',controller.updateProfileInfo)
router.put('/password',controller.updatePassword)
router.post('/address',controller.appendAddress)
router.put('/address',controller.updateAddress)
router.delete('/address/:id',controller.deleteAddress)
router.post('/paymentCard',controller.appendPaymentCard)
router.put('/paymentCard',controller.updatePaymentCard)
router.delete('/paymentCard/:id',controller.deletePaymentCard)

export default router