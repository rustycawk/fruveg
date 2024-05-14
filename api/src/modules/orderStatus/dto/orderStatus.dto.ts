import { OrderStatus } from "../../../entities/orderStatus.entity"

export default class OrderStatusDto {
    id:number
    name:string
    code:string
    constructor(data:OrderStatus) {
        this.id = data.id
        this.name = data.name
        this.code = data.code
    }
}