export class ProductFilter {
    productTypeId?: number
    query?: string
    priceFrom?: number
    priceTo?: number

    constructor() {
        this.productTypeId = 0
        this.query = ''
        this.priceFrom = 0
        this.priceTo = 0
    }
}