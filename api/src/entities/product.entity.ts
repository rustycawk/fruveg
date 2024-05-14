import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ProductType } from "./productType.entity";
import { ProductImage } from "./productImage.entity";
import { OrderProduct } from "./orderProduct.entity";

@Entity()
export class Product extends BaseEntity {
    @Column()
    name!: string

    @Column()
    article!:string

    @Column()
    description!:string

    @Column()
    price!:number

    @Column({nullable:true})
    whosalePrice!:number

    @Column({nullable:true})
    whosaleQuantity!:number

    @Column()
    dimensionValue!:number

    @Column()
    dimensions!:string

    @Column({default:false})
    visible!:boolean

    @ManyToOne(()=>ProductType, (productType)=>productType.products)
    productType!:ProductType

    @OneToMany(()=>ProductImage, (productImage)=>productImage.product)
    images!:ProductImage[]

    @OneToMany(()=>OrderProduct, op=>op.product)
    orderProducts!:OrderProduct[]

}