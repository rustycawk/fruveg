import { Repository } from "typeorm"
import { ProductType } from "../../entities/productType.entity"
import { AppDataSource } from "../../data-source"
import { ProductTypeCreateDto } from "./dto/productTypeCreate.dto"
import { ProductTypeDto } from "./dto/productType.dto"
import { ProductTypeUpdateDto } from "./dto/productTypeUpdate.dto"
import { ErrorResponse } from "../../middlewares/types/errorResponse"

class Service {
    repository:Repository<ProductType>

    constructor(){
        this.repository = AppDataSource.getRepository(ProductType)
    }

    async create(dto:ProductTypeCreateDto):Promise<ProductType> {
        const existProductType = await this.repository.findOneBy({name:dto.name, deleted:false})
        if(existProductType) {
            throw ErrorResponse.conflict("PRODUCT_TYPE_ALREADY_EXISTS")
        }
        const productType = new ProductType()
        productType.name = dto.name
        productType.description = dto.description
        if(!dto.logo) {
            throw ErrorResponse.badRequest("PRODUCT_TYPE_LOGO_IS_REQUIRED")
        }
        productType.logo = '/uploads/' + dto.logo.filename
        await this.repository.save(productType)
        return productType
    }

    async findAll():Promise<ProductType[]> {
        return this.repository.find({
            where:{deleted:false},
            order:{id:'ASC'}
        })
    }

    async findOne(id:number):Promise<ProductType | null> {
        return this.repository.findOne({where:{id, deleted:false}})
    }

    async update(dto:ProductTypeUpdateDto):Promise<ProductType> {
        const productType = await this.repository.findOneBy({id:dto.id})
        if(!productType) {
            throw ErrorResponse.notFound("PRODUCT_TYPE_NOT_FOUND")
        }
        productType.name = dto.name ?? productType.name
        productType.description = dto.description ?? productType.description
        if(dto.logo) {
            productType.logo = '/uploads/' + dto.logo.filename
        }
        await this.repository.save(productType)
        return productType
    }

    async delete(id:number) {
        const productType = await this.repository.findOneBy({id})
        if(!productType) {
            throw ErrorResponse.notFound("PRODUCT_TYPE_NOT_FOUND")
        }
        productType.deleted = true
        await this.repository.save(productType)
    }
}

export default new Service()