import { Repository } from 'typeorm'
import { ErrorResponse } from '../../middlewares/types/errorResponse';
import OrderCreateDto from '../order/dto/orderCreate.dto';
import orderService from '../order/service'
import OrderDto from '../order/dto/orderDto';
import { PayloadDto } from '../auth/dto/payload.dto';
import mailService from '../mail/service'
import MailOptionDto from '../mail/dto/mailOption.dto';

class Service {
    async makeOrder(dto:OrderCreateDto, payload:PayloadDto) {
        const order = await orderService.create(dto, payload)
        const orderDto = new OrderDto(order)
        await mailService.send(MailOptionDto.makeOrder(payload.email, orderDto))
        return orderDto
    }

    async getOrders(payload:PayloadDto) {
        const orders = await orderService.findAll(payload)
        return orders.map(order => new OrderDto(order))
    }

    async getOrder(id:number, payload:PayloadDto) {
        const order = await orderService.findOne(id, payload)
        if(!order) {
            throw ErrorResponse.notFound('ORDER_NOT_FOUND')
        }
        return new OrderDto(order)
    }
}

export default new Service();