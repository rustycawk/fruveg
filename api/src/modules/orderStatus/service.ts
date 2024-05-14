import { OrderStatus } from './../../entities/orderStatus.entity';
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { OrderStatusCreateDto } from "./dto/orderStatusCreate.dto"
import { ErrorResponse } from "../../middlewares/types/errorResponse"
import { OrderStatusUpdateDto } from './dto/orderStatusUpdate.dto';

class Service {
    repository: Repository<OrderStatus>
    constructor() {
        this.repository = AppDataSource.getRepository(OrderStatus)
    }
    async findAll(): Promise<OrderStatus[]> {
        return this.repository.find({ where: { deleted: false } })
    }

    async findOne(id: number): Promise<OrderStatus | null> {
        return this.repository.findOne({ where: { id, deleted: false } })
    }

    async findByCode(code: string): Promise<OrderStatus | null> {
        return this.repository.findOne({ where: { code, deleted: false } })
    }

    async create(dto: OrderStatusCreateDto): Promise<OrderStatus> {
        const orderStatus = new OrderStatus()
        orderStatus.name = dto.name
        orderStatus.code = dto.code
        return this.repository.save(orderStatus)
    }

    async update(dto: OrderStatusUpdateDto): Promise<OrderStatus> {
        const orderStatus = await this.repository.findOneBy({ id: dto.id })
        if (!orderStatus) {
            throw ErrorResponse.notFound("ORDER_STATUS_NOT_FOUND")
        }
        orderStatus.name = dto.name ?? orderStatus.name
        orderStatus.code = dto.code ?? orderStatus.code
        return this.repository.save(orderStatus)
    }

    async delete(id: number): Promise<void> {
        const orderStatus = await this.repository.findOneBy({ id })
        if (!orderStatus) {
            throw ErrorResponse.notFound("ORDER_STATUS_NOT_FOUND")
        }
        orderStatus.deleted = true
        await this.repository.save(orderStatus)
    }
}

export default new Service()