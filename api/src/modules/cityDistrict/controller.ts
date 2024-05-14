import {Response, Request, NextFunction} from 'express'
import service from "./service";


class Controller {
    async findAll(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.findAll()
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async findOne(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.findOne(+req.params.id)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async create(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.create(req.body)
            return res.status(201).json(data)
        } catch(e) {
            next(e)
        }
    }

    async update(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.update(req.body)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async delete(req:Request, res:Response, next:NextFunction) {
        try {
            await service.delete(+req.params.id)
            res.status(204).send()
        } catch(e) {
            next(e)
        }
    }
}

export default new Controller()