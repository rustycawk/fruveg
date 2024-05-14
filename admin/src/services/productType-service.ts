import { FILE_HOST, HOST } from "./axios-init"

class ProductTypeService {
    baseURL: string
    constructor() {
        this.baseURL = "https://fruveg-api.5dev.kz/api/productType";
    }

    async findAll() {
        const response = await HOST.get(`${this.baseURL}`)
        return response
    }

    async create(fd: FormData) {
        const response = await FILE_HOST.post(`${this.baseURL}`, fd)
        return response
    }

    async update(fd: FormData, id: number) {
        const response = await FILE_HOST.put(`${this.baseURL}/` + id, fd)
        return response
    }

    async delete(id:number) {
        const response = await HOST.delete(`${this.baseURL}/` + id)
        return response
    }
}

const productTypeService = new ProductTypeService()
export default productTypeService