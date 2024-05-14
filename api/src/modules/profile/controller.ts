import { Request, Response, NextFunction } from 'express'
import service from "./service";
import { PayloadDto } from '../auth/dto/payload.dto';

class Controller {
    async getProfileInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.getProfileInfo(req.user as PayloadDto)
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async updateProfileInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.updateBaseInfo(req.body, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.updatePassword(req.body, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async appendAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.appendAddress(req.body, req.user as PayloadDto)
            return res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    async updateAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.updateAddress(req.body, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async deleteAddress(req: Request, res: Response, next: NextFunction) {
        try {
            await service.deleteAddress(+req.params.id, req.user as PayloadDto)
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    }

    async appendPaymentCard(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.appendPaymentCard(req.body, req.user as PayloadDto)
            return res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    async updatePaymentCard(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.updatePaymentCard(req.body, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async deletePaymentCard(req: Request, res: Response, next: NextFunction) {
        try {
            await service.deletePaymentCard(+req.params.id, req.user as PayloadDto)
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    }
}

export default new Controller()