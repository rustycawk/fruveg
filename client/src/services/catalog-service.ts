import ProductFilter from '../types/catalog/ProductFilter'
import { HOST } from './axios-init'

class CatalogService {
    baseURL: string
    constructor() {
        this.baseURL = "https://fruveg-api.5dev.kz/api/catalog";
    }
    async getProductTypes() {
        const response = await HOST.get(`${this.baseURL}/productTypes`)
        return response
    }

    async getProducts(filter: ProductFilter) {
        const response = await HOST.post(`${this.baseURL}/products`, filter)
        return response
    }

    async getProduct(id: number) {
        const response = await HOST.get(`${this.baseURL}/products/${id}`)
        return response
    }
}

const catalogService = new CatalogService()
export default catalogService