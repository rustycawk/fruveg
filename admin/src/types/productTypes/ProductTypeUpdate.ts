import { IProductType } from "./IProductType"

export class ProductTypeUpdate {
    name: string
    description: string
    logo?:File
    constructor(data:IProductType) {
        this.name = data.name
        this.description = data.description
    }
}