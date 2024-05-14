import { NextFunction, Request, Response } from "express";
import service from "./service";
import { PayloadDto } from "./dto/payload.dto";

class Controller {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const [payload, token] = await service.login(req.body)
            res.cookie('token', token, { httpOnly: true })
            return res.json(payload)
        }
        catch (err) {
            next(err)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token')
            return res.sendStatus(204)
        }
        catch (err) {
            next(err)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const [payload, token] = await service.refresh(req.user as PayloadDto)
            res.cookie('token', token, { httpOnly: true })
            return res.json(payload)
        }
        catch (err) {
            next(err)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            await service.register(req.body)
            return res.status(201).send()
        }
        catch (err) {
            next(err)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            await service.activate(req.body.email, req.body.key)
            return res.sendStatus(204)
        }
        catch (err) {
            next(err)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            await service.resetPassword(req.body.email)
            return res.sendStatus(204)
        }
        catch (err) {
            next(err)
        }
    }

    async resetPasswordPost(req: Request, res: Response, next: NextFunction) {
        try {
            await service.resetPasswordPost(req.body)
            return res.sendStatus(204)
        }
        catch (err) {
            next(err)
        }
    }
}

export default new Controller()