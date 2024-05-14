export default class PaymentCreateResponse {
    name: string
    cardNumber: string
    expirationDate: string
    constructor() {
        this.name = ''
        this.cardNumber = ''
        this.expirationDate = ''
    }
}