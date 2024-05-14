import { IProfile } from "./IProfile"

export class ProfileUpdate {
    phone: string
    email: string
    name: string
    lastName: string
    constructor(data:IProfile) {
        this.phone = data.phone
        this.email = data.email
        this.name = data.name
        this.lastName = data.surname
    }
}