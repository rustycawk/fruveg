import { IProduct } from "./IProduct"

export class ProductUpdateRequest {
    name: string
    description:string
    article:string
    price:number
    dimensionValue:number
    dimensions:string
    productTypeId:number
    whosalePrice:number
    whosaleQuantity:number
    constructor(product:IProduct) {
        this.name = product.name
        this.description = product.description
        this.article = product.article
        this.price = product.price
        this.dimensionValue = product.dimensionValue
        this.dimensions = product.dimensions
        this.productTypeId = product.productType.id
        this.whosalePrice = product.whosalePrice
        this.whosaleQuantity = product.whosaleQuantity
    }

}  