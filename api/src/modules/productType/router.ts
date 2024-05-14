import express from 'express'
import multer from 'multer'

import controller from './controller'

import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

const router = express.Router()

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.post('/',upload.single('logo'), controller.create)
router.put('/:id', upload.single('logo'), controller.update)
router.delete('/:id', controller.delete)

export default router