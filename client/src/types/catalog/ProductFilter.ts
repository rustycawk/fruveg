export default class ProductFilter {
    type?: 'all' | 'popular' | 'new'
    productTypeId?: number
    query?: string
    priceFrom?: number
    priceTo?: number
}