import { NextFunction, Request, Response } from 'express';
import cookie from 'cookie';
import jwt from 'jsonwebtoken'
import { ErrorResponse } from './types/errorResponse';

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    console.log(cookies)
    jwt.verify(cookies.token, process.env.JWT_SECRET as string, (err, user) => {
        if(err) {
            throw ErrorResponse.unauthorized("UNAUTHORIZED")
        }
        req.user = user
        next()
    })
}