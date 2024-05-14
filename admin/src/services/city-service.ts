import { FILE_HOST, HOST } from "./axios-init"

class CityService {
    baseURL: string
    districtBaseUrl: string

    constructor() {
        this.baseURL = "https://fruveg-api.5dev.kz/api/city";
        this.districtBaseUrl = "https://fruveg-api.5dev.kz/api/cityDistrict";
    }

    async findAll() {
        const response = await HOST.get(`${this.baseURL}`)
        return response
    }

    async findOne(id:number) {
        const response = await HOST.get(`${this.baseURL}/`+id)
        return response
    }

    async create(name:string) {
        const response = await HOST.post(`${this.baseURL}`, {name})
        return response
    }

    async update(name:string, id:number) {
        const response = await HOST.put(`${this.baseURL}`, {name,id})
        return response
    }

    async delete(id:number) {
        const response = await HOST.delete(`${this.baseURL}/`+id)
        return response
    }

    async appendDistrict(name:string, cityId:number) {
        const response = await HOST.post(`${this.districtBaseUrl}`, {
            name,
            cityId
        })
        return response
    }

    async updateDistrict(name:string, id:number) {
        const response = await HOST.put(`${this.districtBaseUrl}`, {
            id,
            name
        })
        return response
    }

    async deleteDistrict(id:number) {
        const response = await HOST.delete(`${this.districtBaseUrl}/`+id)
        return response
    }
}

const cityService = new CityService()
export default cityService