import { Product } from "../../../entities/product.entity"
import { ProductTypeDto } from "../../productType/dto/productType.dto"

export default class ProductDto {
    id: number
    name: string
    article: string
    description: string
    dimensionValue: number
    dimensions: string
    price: number
    whosalePrice:number
    whosaleQuantity:number
    productType: ProductTypeDto
    images: string[]
    constructor(data: Product) {
        this.id = data.id
        this.name = data.name
        this.article = data.article
        this.description = data.description
        this.dimensionValue = data.dimensionValue
        this.dimensions = data.dimensions
        this.price = data.price
        this.productType = new ProductTypeDto(data.productType)
        this.images = data.images.map(image => image.path)
        this.whosalePrice = data.whosalePrice
        this.whosaleQuantity = data.whosaleQuantity
    }
}