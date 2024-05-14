import { OrderProduct } from "../../../entities/orderProduct.entity"
import ProductDto from "../../product/dto/product.dto"

export default class OrderProductDto {
    id: number
    product: ProductDto
    salePrice:number
    amount:number
    constructor(data:OrderProduct) {
        this.id = data.id
        this.product = new ProductDto(data.product)
        this.salePrice = data.price
        this.amount = data.amount
    }
}