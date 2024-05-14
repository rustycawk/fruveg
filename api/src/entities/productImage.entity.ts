import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";

@Entity()
export class ProductImage extends BaseEntity {
    @Column()
    path!: string

    @ManyToOne(()=>Product, (product) => product.images)
    product!: Product
}