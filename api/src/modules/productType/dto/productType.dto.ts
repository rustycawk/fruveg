import { ProductType } from "../../../entities/productType.entity"

export class ProductTypeDto {
    id!:number
    name!:string
    description!:string
    logo!:string

    constructor(data:ProductType) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.logo = data.logo
    }
}