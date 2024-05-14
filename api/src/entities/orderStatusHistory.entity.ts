import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";
import { OrderStatus } from "./orderStatus.entity";

@Entity()
export class OrderStatusHistory extends BaseEntity {
    @ManyToOne(()=>Order, order => order.orderStatusHistories)
    order!: Order

    @ManyToOne(()=>OrderStatus, orderStatus => orderStatus.orderStatusHistories)
    orderStatus!: OrderStatus
}