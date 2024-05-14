import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { City } from "./city.entity";
import { UserAddress } from "./userAddress.entity";

@Entity()
export class CityDistrict extends BaseEntity {
    @Column()
    name!: string

    @ManyToOne(()=>City, (city)=>city.districts)
    city!: City

    @OneToMany(()=>UserAddress, (userAddress)=>userAddress.cityDistrict)
    userAddresses!: UserAddress[]
}