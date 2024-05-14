import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { City } from "./city.entity";
import { CityDistrict } from "./cityDistrict.entity";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class UserAddress extends BaseEntity {
    @Column()
    street!: string
    
    @Column()
    house!:string

    @Column()
    roomNumber!:string

    @Column({nullable:true})
    floor!:string

    @Column({nullable:true})
    comments!:string

    @ManyToOne(()=>City, c=>c.userAddresses, {nullable:true})
    city?: City

    @ManyToOne(()=>CityDistrict, cd=>cd.userAddresses, {nullable:true})
    cityDistrict?: CityDistrict

    @ManyToOne(()=>User, u=>u.userAddresses)
    user!: User

    @OneToMany(()=>Order, o=>o.userAddress, {nullable:true})
    orders?: Order[]
}