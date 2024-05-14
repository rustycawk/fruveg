export interface IProfileAddress {
    id: number
    city?: {
        id: number;
        name: string;
    }
    cityDistrict?: {
        id: number;
        name: string;
    }
    street: string
    house: string
    roomNumber: string
    floor: string
    comments: string
}