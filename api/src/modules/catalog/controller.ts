import { Request, Response, NextFunction } from 'express'
import service from './service'

class Controller {
    async getProductTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.getProductTypes()
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.getProducts(req.body)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.getProduct(+req.params.id)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }
}

export default new Controller();