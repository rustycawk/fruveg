import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.post('/', controller.create)
router.put('/', controller.update)
router.delete('/:id', controller.delete)

export default router