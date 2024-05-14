export class ProductTypeUpdateDto {
    id!:number
    name?:string
    logo?:Express.Multer.File
    description?:string
}