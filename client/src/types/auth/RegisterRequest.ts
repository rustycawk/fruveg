export default class RegisterRequest {
    email: string
    phone: string
    name: string
    lastName: string
    password:string
    constructor() {
        this.email = ''
        this.phone = ''
        this.name = ''
        this.lastName = ''
        this.password = ''
    }
}