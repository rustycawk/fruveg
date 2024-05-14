import { ErrorResponse } from '../../middlewares/types/errorResponse'
import ProductDto from '../product/dto/product.dto'
import ProductFilterDto from '../product/dto/productFilter.dto'
import productService from '../product/service'
import { ProductTypeDto } from '../productType/dto/productType.dto'
import productTypeService from '../productType/service'

import { Repository } from 'typeorm'

class Service {

    async getProductTypes() {
        const productTypes = await productTypeService.findAll()
        return productTypes.map(productType => new ProductTypeDto(productType))
    }

    async getProducts(filter: ProductFilterDto): Promise<[ProductDto[], number]> {
        const [products, count] = await productService.findByFilter(filter)
        return [products.map(product => new ProductDto(product)), count]
    }

    async getProduct(id: number) {
        const product = await productService.findOne(id)
        if(!product) {
            throw ErrorResponse.notFound('PRODUCT_NOT_FOUND')
        }
        return new ProductDto(product)
    }

}

export default new Service();