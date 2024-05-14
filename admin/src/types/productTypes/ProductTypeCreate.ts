export class ProductTypeCreate {
    name: string
    description: string
    logo?:File
    constructor() {
        this.name = ''
        this.description = ''
    }
}