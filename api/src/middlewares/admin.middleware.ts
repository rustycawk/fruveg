import { NextFunction, Request, Response } from 'express';
import { PayloadDto } from '../modules/auth/dto/payload.dto';
import dotenv from 'dotenv'
import { ErrorResponse } from './types/errorResponse';
dotenv.config()

export const adminMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const userPayload: PayloadDto = req.user as PayloadDto
    if(userPayload.email !== process.env.ADMIN_USER!) {
        throw ErrorResponse.forbidden("FORBIDDEN")
    }
    next()
}