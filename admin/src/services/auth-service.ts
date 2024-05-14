import LoginRequest from "../types/auth/LoginRequest"
import { HOST } from "./axios-init"

class AuthService {
    baseURL: string
    constructor() {
        this.baseURL = "https://fruveg-api.5dev.kz/api/auth";
    }

    async login(formData:LoginRequest) {
        const response = await HOST.post(`${this.baseURL}/login`, formData)
        return response
    }

    async logout() {
        const response = await HOST.post(`${this.baseURL}/logout`)
        return response
    }

    async refresh() {
        const response = await HOST.get(`${this.baseURL}/refresh`)
        return response
    }
}

const authService = new AuthService()

export default authService