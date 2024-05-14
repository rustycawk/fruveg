import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class UserPaymentCard extends BaseEntity {
    @Column()
    name!:string
    @Column()
    cardNumber!: string;
    @Column()
    expirationDate!:string;

    @Column({nullable:true})
    token?:string
    

    @ManyToOne(()=>User, user=>user.userPaymentCards)
    user!:User

    @OneToMany(()=>Order, order=>order.userPaymentCard, {nullable:true})
    orders?:Order[]
}