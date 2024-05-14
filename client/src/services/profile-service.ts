import { ProfileUpdate } from "../types/profile/ProfileUpdate"
import { ProfileUpdatePassword } from "../types/profile/ProfileUpdatePassword"
import AddressCreateResponse from "../types/profile/address/AddressCreateResponse"
import PaymentCreateResponse from "../types/profile/payment/PaymentCreateResponse"
import { HOST } from "./axios-init"

class ProfileService {
    baseURL:string
    constructor() {
        this.baseURL = "https://fruveg-api.5dev.kz/api/profile";
    }
    async getProfileInfo() {
        const response = await HOST.get(`${this.baseURL}`)
        return response
    }

    async getCities() {
        const response = await HOST.get("https://fruveg-api.5dev.kz/api/city");
        return response
    }

    async appendAddress(fd:AddressCreateResponse) {
        const response = await HOST.post(`${this.baseURL}/address`, fd)
        return response
    }

    async appendPayment(fd:PaymentCreateResponse) {
        const response = await HOST.post(`${this.baseURL}/paymentCard`, {
            ...fd,
            cardNumber: fd.cardNumber.replace(/\s+/g, '')
        })
        return response
    }

    async updateProfile(fd:ProfileUpdate) {
        const response = await HOST.put(`${this.baseURL}/baseInfo`, fd)
        return response
    }

    async updatePassword(dto:ProfileUpdatePassword) {
        const response = await HOST.put(`${this.baseURL}/password`, dto)
        return response
    }
}

const profileService = new ProfileService()
export default profileService