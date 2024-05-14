import { BaseEntity } from "./base.entity";
import { Column, Entity, OneToMany } from 'typeorm'
import { UserAddress } from "./userAddress.entity";
import { UserPaymentCard } from "./userPaymentCard.entity";

@Entity()
export class User extends BaseEntity {
    @Column()
    phone!: string

    @Column()
    email!: string

    @Column()
    name!: string

    @Column()
    lastName!: string

    @Column()
    passwordHash!: string

    @Column({ nullable: true })
    key?: string

    @Column({ default: false, nullable: true })
    isActive?: boolean

    @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
    userAddresses!: UserAddress[]

    @OneToMany(() => UserPaymentCard, (userPaymentCard) => userPaymentCard.user)
    userPaymentCards!: UserPaymentCard[]
}