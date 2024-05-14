import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CityDistrict } from "./cityDistrict.entity";
import { UserAddress } from "./userAddress.entity";

@Entity()
export class City extends BaseEntity {
    @Column()
    name!: string

    @OneToMany(()=>CityDistrict, cityDistrict=>cityDistrict.city)
    districts!: CityDistrict[]

    @OneToMany(()=>UserAddress, userAddress=>userAddress.city)
    userAddresses!: UserAddress[]
}