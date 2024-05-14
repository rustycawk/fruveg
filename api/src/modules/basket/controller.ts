import { Request, Response, NextFunction } from 'express'
import service from './service'
import { PayloadDto } from '../auth/dto/payload.dto';

class Controller {
    async makeOrder(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.makeOrder(req.body, req.user as PayloadDto)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async getOrders(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.getOrders(req.user as PayloadDto)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async getOrder(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.getOrder(+req.params.id, req.user as PayloadDto)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }
}

export default new Controller();