import { OrderStatusHistory } from "../../../entities/orderStatusHistory.entity"
import OrderStatusDto from "../../orderStatus/dto/orderStatus.dto"

export default class OrderStatusHistoryDto {
    id: number
    status: OrderStatusDto
    date: Date
    constructor(data: OrderStatusHistory) {
        this.id = data.id
        this.status = new OrderStatusDto(data.orderStatus)
        this.date = data.createdAt
    }
}