export class ErrorResponse {
    code!:number
    message!:string
    errors?:any

    constructor(code:number, message:string, errors?:any) {
        this.code = code
        this.message = message
        this.errors = errors
    }

    static notFound(message:string, errors?:any) {
        return new ErrorResponse(404, message, errors)
    }

    static badRequest(message:string, errors?:any) {
        return new ErrorResponse(400, message, errors)
    }

    static forbidden(message:string) {
        return new ErrorResponse(403, message)
    }

    static unauthorized(message:string) {
        return new ErrorResponse(401, message)
    }

    static conflict(message:string) {
        return new ErrorResponse(409, message)
    }

    static internal(message:string, errors?:any) {
        return new ErrorResponse(500, message, errors)
    }
}