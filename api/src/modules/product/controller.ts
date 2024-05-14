import { NextFunction, Request, Response } from "express";
import service from "./service"

class Controller {
    async findAll(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.findAll()
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async findAllByFilter(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.findByFilter(req.body)
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async findOne(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.findOne(+req.params.id)
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async create(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.create(req.body)
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async update(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.update({
                ...req.body,
                id: +req.params.id
            })
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async delete(req:Request, res:Response, next:NextFunction) {
        try {
            await service.delete(+req.params.id)
            res.status(204).send()
        }
        catch (err) {
            next(err)
        }
    }

    async appendImage(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.appendImage(+req.params.id, req.file as Express.Multer.File)
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async removeImage(req:Request, res:Response, next:NextFunction) {
        try {
            await service.removeImage(+req.params.id)
            res.status(204).send()
        }
        catch (err) {
            next(err)
        }
    }

    async toggleVisible(req:Request, res:Response, next:NextFunction) {
        try {
            await service.toggleVisible(+req.params.id)
        }
        catch (err) {
            next(err)
        }
    }
}

export default new Controller()