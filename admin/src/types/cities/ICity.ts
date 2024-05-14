import { ICityDistrict } from "./ICityDistrict"

export interface ICity {
    id: number
    name: string
    deleted:boolean
    createdAt: string
    updatedAt: string
    districts:ICityDistrict[]
}