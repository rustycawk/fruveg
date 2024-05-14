import { NextFunction, Request, Response } from "express"
import { ErrorResponse } from "./types/errorResponse"

export const errorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {

    console.log(err)
    
    if(!(err instanceof ErrorResponse)) {
        err = ErrorResponse.internal(err.message)
    }

    return res.status(err.code).json({
        message: err.message,
        errors: err.errors
    })
}