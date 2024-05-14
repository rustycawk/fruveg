import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OrderProduct } from "./orderProduct.entity";
import { UserAddress } from "./userAddress.entity";
import { UserPaymentCard } from "./userPaymentCard.entity";
import { OrderStatusHistory } from "./orderStatusHistory.entity";

@Entity()
export class Order extends BaseEntity {

    @Column({nullable:true})
    comment?: string

    @OneToMany(()=>OrderProduct, og=>og.order)
    products?: OrderProduct[]

    @ManyToOne(()=>UserAddress, ua=>ua.orders)
    userAddress!: UserAddress

    @ManyToOne(()=>UserPaymentCard, upc=>upc.orders)
    userPaymentCard!: UserPaymentCard

    @OneToMany(()=>OrderStatusHistory, osh=>osh.order)
    orderStatusHistories?: OrderStatusHistory[]
}