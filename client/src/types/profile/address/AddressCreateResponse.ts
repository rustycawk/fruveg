export default class AddressCreateResponse {
    street: string
    house: string
    roomNumber: string
    floor:string
    comments:string
    cityId?: number
    cityDistrictId?: number

    constructor() {
        this.street = ''
        this.house = ''
        this.roomNumber = ''
        this.floor = ''
        this.comments = ''
    }
}