import AddressCreateResponse from "../profile/address/AddressCreateResponse"
import PaymentCreateResponse from "../profile/payment/PaymentCreateResponse"
import MakeOrderProductItem from "./MakeOrderProductItem"

export default class MakeOrderResponse {
    comments?:string
    userAddressId?: number
    userNewAddress?: AddressCreateResponse
    userPaymentCardId?:number
    userNewPaymentCard?:PaymentCreateResponse
    products:MakeOrderProductItem[]
    constructor() {
        this.products = []
    }
}