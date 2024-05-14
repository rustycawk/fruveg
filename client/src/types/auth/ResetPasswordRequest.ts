export default class ResetPasswordRequest {
    key: string
    newPassword: string
    constructor(key:string) {
        this.key = key
        this.newPassword = ''
    }
}