import { UserPaymentCard } from "../../../entities/userPaymentCard.entity"

export class ProfilePaymentCardDto {
    id!:number
    name!: string
    cardNumber!: string
    expirationDate!: string
    constructor(data:UserPaymentCard) {
        this.id = data.id
        this.name = data.name
        this.cardNumber = data.cardNumber.substring(0, 4) + '******' + data.cardNumber.substring(12, 16)
        this.expirationDate = data.expirationDate
    }
}