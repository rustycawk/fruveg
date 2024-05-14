import { User } from "../../../entities/user.entity"
import { ProfileAddressDto } from "./profileAddress.dto"
import { ProfilePaymentCardDto } from "./profilePaymentCard.dto"

export class ProfileInfoDto {
    name: string
    surname: string
    email: string
    phone: string
    addresses: ProfileAddressDto[]
    payments: ProfilePaymentCardDto[]
    constructor(user: User) {
        this.name = user.name
        this.surname = user.lastName
        this.email = user.email
        this.phone = user.phone
        this.addresses = user.userAddresses ? user.userAddresses.filter(address=>!address.deleted).map(address => new ProfileAddressDto(address)) : []
        this.payments = user.userPaymentCards ? user.userPaymentCards.filter(payment=>!payment.deleted).map(payment => new ProfilePaymentCardDto(payment)) : []
    }
}