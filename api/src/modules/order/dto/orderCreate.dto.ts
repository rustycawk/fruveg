import { UserAddressCreateDto } from "../../userAddress/dto/userAddressCreate.dto"
import { UserPaymentCardCreateDto } from "../../userPaymentCard/dto/userPaymentCardCreate.dto"
import OrderCreateProductDto from "./orderCreate.Product.dto"

export default class OrderCreateDto {
    comments?: string
    userAddressId?: number
    userNewAddress?: UserAddressCreateDto
    userPaymentCardId?:number
    userNewPaymentCard?:UserPaymentCardCreateDto

    products!:OrderCreateProductDto[]
}