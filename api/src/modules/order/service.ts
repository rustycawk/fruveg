import { UserPaymentCard } from './../../entities/userPaymentCard.entity';
import { UserAddress } from './../../entities/userAddress.entity';
import { Repository } from 'typeorm'
import { ErrorResponse } from '../../middlewares/types/errorResponse';
import { Order } from '../../entities/order.entity';
import { OrderProduct } from '../../entities/orderProduct.entity';
import { AppDataSource } from '../../data-source';
import OrderCreateDto from './dto/orderCreate.dto';
import userAddressService from '../userAddress/service';
import { PayloadDto } from '../auth/dto/payload.dto';
import productService from '../product/service';
import userPaymentCardService from '../userPaymentCard/service';
import orderStatusService from '../orderStatus/service'
import { OrderStatusHistory } from '../../entities/orderStatusHistory.entity';

class Service {

    orderRepository: Repository<Order>
    orderProductRepository: Repository<OrderProduct>
    orderStatusHistoryRepository: Repository<OrderStatusHistory>

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order)
        this.orderProductRepository = AppDataSource.getRepository(OrderProduct)
        this.orderStatusHistoryRepository = AppDataSource.getRepository(OrderStatusHistory)
    }

    async create(dto: OrderCreateDto, payload: PayloadDto): Promise<Order> {
        return AppDataSource.transaction(async manager => {
            try {
                manager.query('BEGIN')

                const order = new Order()

                if(dto.comments) {
                    order.comment = dto.comments
                }

                let userAddress: UserAddress | null
                if (dto.userAddressId) {
                    userAddress = await userAddressService.findOne(dto.userAddressId)
                    if (!userAddress) {
                        throw ErrorResponse.notFound('USER_ADDRESS_NOT_FOUND')
                    }
                } else if (dto.userNewAddress) {
                    userAddress = await userAddressService.create(dto.userNewAddress, payload.id)
                } else {
                    throw ErrorResponse.badRequest('USER_ADDRESS_REQUIRED')
                }
                order.userAddress = userAddress

                let userPaymentCard: UserPaymentCard | null
                if (dto.userPaymentCardId) {
                    userPaymentCard = await userPaymentCardService.findOne(dto.userPaymentCardId)
                    if (!userPaymentCard) {
                        throw ErrorResponse.notFound('USER_PAYMENT_CARD_NOT_FOUND')
                    }
                } else if (dto.userNewPaymentCard) {
                    userPaymentCard = await userPaymentCardService.create(dto.userNewPaymentCard, payload.id)
                } else {
                    throw ErrorResponse.badRequest('USER_PAYMENT_CARD_REQUIRED')
                }
                order.userPaymentCard = userPaymentCard

                order.products = []
                await this.orderRepository.save(order)

                let orderStatus = await orderStatusService.findByCode('NEW')
                if (!orderStatus) {
                    throw ErrorResponse.notFound('ORDER_STATUS_NOT_FOUND')
                }
                let orderStatusHistory = new OrderStatusHistory()
                orderStatusHistory.order = order
                orderStatusHistory.orderStatus = orderStatus
                await this.orderStatusHistoryRepository.save(orderStatusHistory)

                order.orderStatusHistories = [orderStatusHistory]

                for (let item of dto.products) {
                    const orderProduct = new OrderProduct()
                    orderProduct.order = order
                    let product = await productService.findOne(item.productId)
                    if (!product) {
                        throw ErrorResponse.notFound('PRODUCT_NOT_FOUND')
                    }
                    orderProduct.product = product
                    orderProduct.amount = item.amount
                    orderProduct.price = item.price
                    await this.orderProductRepository.save(orderProduct)
                    order.products.push(orderProduct)
                }
                return order;
            } catch (error) {
                manager.query('ROLLBACK')
                throw ErrorResponse.internal("INTERNAL_SERVER_ERROR", error)
            }
        })
    }

    async findAll(payload: PayloadDto): Promise<Order[]> {
        const list = await this.orderRepository.find({
            where: {
                userAddress: {
                    user: {
                        id: payload.id
                    }
                }
            },
            relations: ['products', 'products.product', 'products.product.images', 'products.product.productType', 'userAddress', 'userAddress.city', 'userAddress.cityDistrict', 'userPaymentCard', 'orderStatusHistories.orderStatus', 'orderStatusHistories'],
            order: {
                id: 'DESC'
            }
        })
        return list
    }

    async findOne(id: number, payload: PayloadDto): Promise<Order | null> {
        const order = await this.orderRepository.findOne({
            where: {
                id,
                userAddress: {
                    user: {
                        id: payload.id
                    }
                }
            }, relations: ['products', 'products.product', 'products.product.images', 'products.product.productType', 'userAddress', 'userAddress.city', 'userAddress.cityDistrict', 'userPaymentCard', 'orderStatusHistories.orderStatus', 'orderStatusHistories']
        })
        return order
    }

}

export default new Service();