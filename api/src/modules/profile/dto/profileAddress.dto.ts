import { UserAddress } from "../../../entities/userAddress.entity"

export class ProfileAddressDto {
    id:number
    city?: {
        id: number,
        name: string
    }
    cityDistrict?: {
        id: number,
        name: string
    }
    street:string
    house:string
    roomNumber:string
    floor:string
    comments:string
    constructor(userAddress:UserAddress) {
        this.id = userAddress.id
        if(userAddress.city) {
            this.city = {
                id: userAddress.city.id,
                name: userAddress.city.name
            }
        }
        if(userAddress.cityDistrict) {
            this.cityDistrict = {
                id: userAddress.cityDistrict.id,
                name: userAddress.cityDistrict.name
            }
        }
        this.street = userAddress.street
        this.house = userAddress.house
        this.roomNumber = userAddress.roomNumber
        this.floor = userAddress.floor
        this.comments = userAddress.comments
    }
}