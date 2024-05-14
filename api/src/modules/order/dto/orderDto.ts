import { Order } from "../../../entities/order.entity"
import { ProfileAddressDto } from "../../profile/dto/profileAddress.dto"
import { ProfilePaymentCardDto } from "../../profile/dto/profilePaymentCard.dto"
import OrderProductDto from "./orderProductDto"
import OrderStatusHistoryDto from "./orderStatusHistory.dto"

export default class OrderDto {
    id: number
    date: Date
    comment:string
    orderProducts: OrderProductDto[]
    address: ProfileAddressDto
    payment: ProfilePaymentCardDto
    statusHistories: OrderStatusHistoryDto[]
    constructor(data: Order) {
        this.id = data.id
        this.date = data.createdAt
        this.orderProducts = data.products?.map(product => new OrderProductDto(product)) ?? []
        this.address = new ProfileAddressDto(data.userAddress)
        this.payment = new ProfilePaymentCardDto(data.userPaymentCard)
        this.statusHistories = data.orderStatusHistories?.map(history => new OrderStatusHistoryDto(history)) ?? []
        if(this.statusHistories.length>0) {
            this.statusHistories = this.statusHistories.sort((a,b)=>b.date.getTime()-a.date.getTime())
        }
        this.comment = data.comment ?? 'Заказ без комментариев'
    }

}