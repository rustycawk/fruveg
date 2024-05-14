export class ProductCreateRequest {
    name: string
    description:string
    article:string
    price:number
    dimensionValue:number
    dimensions:string
    productTypeId:number
    whosalePrice:number
    whosaleQuantity:number
    constructor() {
        this.name = ""
        this.description = ""
        this.article = ""
        this.price = 0
        this.dimensionValue = 0
        this.dimensions = ""
        this.productTypeId = 0
        this.whosalePrice = 0
        this.whosaleQuantity = 0
    }
}