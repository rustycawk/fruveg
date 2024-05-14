export class UserAddressCreateDto {
    street!: string
    house!: string
    roomNumber!: string
    floor!:string
    comments!:string
    cityId?: number
    cityDistrictId?: number
}