import MakeOrderResponse from "../types/basket/MakeOrderResponse"
import { HOST } from "./axios-init"

class BasketService {
    baseURL:string
    constructor(){
        this.baseURL = "https://fruveg-api.5dev.kz/api/basket";
    }

    async makeOrder(formData:MakeOrderResponse) {
        const response = await HOST.post(`${this.baseURL}/makeOrder`, formData)
        return response
    }

    async getOrders() {
        const response = await HOST.get(`${this.baseURL}/orders`)
        return response
    }

    async getOrder(id:number) {
        const response = await HOST.get(`${this.baseURL}/orders/${id}`)
        return response
    }

}

const basketService = new BasketService()
export default basketService