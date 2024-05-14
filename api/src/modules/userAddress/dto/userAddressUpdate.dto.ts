export class UserAddressUpdateDto {
    id!:number
    street?: string
    house?: string
    roomNumber?: string
    floor?:string
    comments?:string
    cityId?: number
    cityDistrictId?: number
}