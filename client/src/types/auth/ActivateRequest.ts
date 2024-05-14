export default class ActivateRequest {
    email:string
    key:string
    constructor(email:string, key:string) {
        this.email = email
        this.key = key
    }
}