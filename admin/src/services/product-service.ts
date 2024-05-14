import { ProductFilter } from "../types/products/PorductFilter"
import { ProductCreateRequest } from "../types/products/ProductCreateRequest"
import { ProductUpdateRequest } from "../types/products/ProductUpdateRequest"
import { FILE_HOST, HOST } from "./axios-init"

class ProductService {
    baseURL:string
    constructor() {
        this.baseURL = "https://fruveg-api.5dev.kz/api/product";
    }

    async findAll(filter:ProductFilter) {
        const response = await HOST.post(`${this.baseURL}/findAllByFilter`, filter)
        return response
    }

    async update(request:ProductUpdateRequest, id:number) {
        const response = await HOST.put(`${this.baseURL}/${id}`, request)
        return response
    }

    async create(request:ProductCreateRequest) {
        const response = await HOST.post(`${this.baseURL}`, request)
        return response
    }

    async appendImage(fd:FormData, id:number) {
        const response = await FILE_HOST.post(`${this.baseURL}/image/` + id, fd)
        return response
    }

    async delete(id:number) {
        const response = await HOST.delete(`${this.baseURL}/` + id)
        return response
    }

    async deleteImage(id:number) {
        const response = await HOST.delete(`${this.baseURL}/image/` + id)
        return response
    }

    async toggleVisible(id:number) {
        const response = await HOST.patch(`${this.baseURL}/visible/` + id)
        return response
    }

}

const productService = new ProductService()

export default productService