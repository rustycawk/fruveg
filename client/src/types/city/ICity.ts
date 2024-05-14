import { ICityDistrict } from "./ICityDistrict"

export interface ICity {
    id: number
    name: string
    districts: ICityDistrict[]
}