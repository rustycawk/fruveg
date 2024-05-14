import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";

@Entity()
export class ProductType extends BaseEntity {
    @Column()
    name!:string

    @Column()
    description!:string

    @Column()
    logo!:string

    @OneToMany(()=>Product, product => product.productType)
    products!:Product[]
}