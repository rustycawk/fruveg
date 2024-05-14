import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";
import { OrderStatusHistory } from "./orderStatusHistory.entity";

@Entity()
export class OrderStatus extends BaseEntity {
    @Column()
    name!:string

    @Column()
    code!:string

    @OneToMany(()=>OrderStatusHistory, orderStatusHistory => orderStatusHistory.orderStatus)
    orderStatusHistories?: OrderStatusHistory[]
}