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
            const data = await service.create({
                name: req.body.name,
                description: req.body.description,
                logo: req.file as Express.Multer.File
            })
            return res.json(data)
        }
        catch (err) {
            next(err)
        }
    }

    async update(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await service.update({
                id: +req.params.id,
                name: req.body.name,
                description: req.body.description,
                logo: req.file as Express.Multer.File
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
            return res.sendStatus(204)
        }
        catch (err) {
            next(err)
        }
    }
}

export default new Controller()