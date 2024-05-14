import { Product } from './../../entities/product.entity';
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { ErrorResponse } from "../../middlewares/types/errorResponse"
import { ProductCreateDto } from './dto/productCreate.dto';
import { ProductType } from '../../entities/productType.entity';
import { ProductImage } from '../../entities/productImage.entity';
import { ProductUpdateDto } from './dto/productUpdate.dto';
import ProductFilterDto from './dto/productFilter.dto';
import productTypeService from '../productType/service'

class Service {
    repository:Repository<Product>

    constructor(){
        this.repository = AppDataSource.getRepository(Product)
    }

    async create(dto:ProductCreateDto):Promise<Product> {
        console.log(dto)
        const existProduct = await this.repository.findOneBy({article:dto.article})
        if(existProduct) {
            throw ErrorResponse.conflict("PRODUCT_ALREADY_EXISTS")
        }
        const product = new Product()
        product.name = dto.name
        product.article = dto.article
        product.description = dto.description
        product.price = dto.price
        product.whosalePrice = dto.whosalePrice
        product.whosaleQuantity = dto.whosaleQuantity
        product.dimensionValue = dto.dimensionValue
        product.dimensions = dto.dimensions
        const productType = await productTypeService.findOne(dto.productTypeId)
        if(!productType) {
            throw ErrorResponse.badRequest("PRODUCT_TYPE_NOT_FOUND")
        }
        product.productType = productType
        return this.repository.save(product)
    }

    async findAll():Promise<Product[]> {
        return await this.repository.find({relations:['images', 'productType'], where:{deleted:false}})
    }

    async findByFilter(filter:ProductFilterDto):Promise<[Product[],number]> {
        const data = await this.repository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.images','images')
        .innerJoinAndSelect('product.productType', 'productType')
        .where((qb)=>{
            qb.andWhere('product.deleted = :deleted', {deleted:false})
            qb.andWhere('images.deleted = :deleted', {deleted:false})
            if(filter.productTypeId) {
                qb.andWhere('productType.id = :productTypeId', {productTypeId:filter.productTypeId})
            }
            if(filter.query) {
                qb.andWhere('(LOWER(product.name) LIKE :query or LOWER(product.article) LIKE :query)', {query:`%${filter.query.toLowerCase()}%`})
            }
            if(filter.priceFrom) {
                qb.andWhere('product.price >= :priceFrom', {priceFrom:filter.priceFrom})
            }
            if(filter.priceTo) {
                qb.andWhere('product.price <= :priceTo', {priceTo:filter.priceTo})
            }
        }).getManyAndCount()
        return data
    }

    async findOne(id:number):Promise<Product | null> {
        return this.repository.findOne({
            where:{id:id},
            relations:['images','productType']
        })
    }

    async update(dto:ProductUpdateDto):Promise<Product> {
        const product = await this.repository.findOneBy({id:dto.id})
        if(!product) {
            throw ErrorResponse.notFound("PRODUCT_NOT_FOUND")
        }
        product.name = dto.name ?? product.name
        product.description = dto.description ?? product.description
        product.price = dto.price ?? product.price
        product.dimensionValue = dto.dimensionValue ?? product.dimensionValue
        product.dimensions = dto.dimensions ?? product.dimensions
        product.whosalePrice = dto.whosalePrice ?? product.whosalePrice
        product.whosaleQuantity = dto.whosaleQuantity ?? product.whosaleQuantity
        if(dto.productTypeId) {
            const productType = await productTypeService.findOne(dto.productTypeId)
            if(!productType) {
                throw ErrorResponse.badRequest("PRODUCT_TYPE_NOT_FOUND")
            }
            product.productType = productType
        }
        return this.repository.save(product)
    }

    async delete(id:number) {
        const product = await this.repository.findOneBy({id})
        if(!product) {
            throw ErrorResponse.notFound("PRODUCT_NOT_FOUND")
        }
        product.deleted = true
        await this.repository.save(product)
    }

    async appendImage(id:number, image:Express.Multer.File):Promise<ProductImage> {
        const product = await this.repository.findOneBy({id})
        if(!product) {
            throw ErrorResponse.notFound("PRODUCT_NOT_FOUND")
        }
        const productImage = new ProductImage()
        productImage.path = '/uploads/' + image.filename
        productImage.product = product
        return await AppDataSource.getRepository(ProductImage).save(productImage)
    }

    async removeImage(id:number) {
        const productImage = await AppDataSource.getRepository(ProductImage).findOneBy({id})
        if(!productImage) {
            throw ErrorResponse.notFound("PRODUCT_IMAGE_NOT_FOUND")
        }
        productImage.deleted = true
        await AppDataSource.getRepository(ProductImage).save(productImage)
    }

    async toggleVisible(id:number) {
        const product = await this.repository.findOne({where:{id},relations:['images']})
        if(!product) {
            throw ErrorResponse.notFound("PRODUCT_NOT_FOUND")
        }
        if(!product.images || !product.images.length) {
            throw ErrorResponse.badRequest("PRODUCT_IMAGES_REQUIRED")
        }
        product.visible = !product.visible
        await this.repository.save(product)
    }
}

export default new Service()