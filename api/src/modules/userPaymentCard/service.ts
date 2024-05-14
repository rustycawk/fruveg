import { Repository } from 'typeorm'
import { UserPaymentCard } from '../../entities/userPaymentCard.entity'
import { ErrorResponse } from '../../middlewares/types/errorResponse'
import userService from '../user/service'
import { UserPaymentCardCreateDto } from './dto/userPaymentCardCreate.dto'
import { AppDataSource } from '../../data-source'
import { UserPaymentCardUpdateDto } from './dto/userPaymentCardUpdate.dto'

class Service {
    repository: Repository<UserPaymentCard>
    constructor() {
        this.repository = AppDataSource.getRepository(UserPaymentCard)
    }

    async findOne(id:number):Promise<UserPaymentCard | null> {
        return this.repository.findOne({where:{ id } })
    }

    async create(dto:UserPaymentCardCreateDto, userId:number):Promise<UserPaymentCard> {
        const user = await userService.findById(userId)
        if (!user) {
            throw ErrorResponse.notFound('USER_NOT_FOUND')
        }
        const userPaymentCard = new UserPaymentCard()
        userPaymentCard.user = user
        userPaymentCard.name = dto.name
        userPaymentCard.cardNumber = dto.cardNumber
        userPaymentCard.expirationDate = dto.expirationDate
        return this.repository.save(userPaymentCard)        
    }
    async update(dto:UserPaymentCardUpdateDto, userId:number):Promise<UserPaymentCard> {
        const user = await userService.findById(userId)
        if (!user) {
            throw ErrorResponse.notFound('USER_NOT_FOUND')
        }
        const userPaymentCard = await this.repository.findOne({where:{ id: dto.id, user:{id:user.id}} })
        if (!userPaymentCard) {
            throw ErrorResponse.notFound('USER_PAYMENT_CARD_NOT_FOUND')
        }
        userPaymentCard.name = dto.name??userPaymentCard.name
        userPaymentCard.cardNumber = dto.cardNumber??userPaymentCard.cardNumber
        userPaymentCard.expirationDate = dto.expirationDate??userPaymentCard.expirationDate
        return this.repository.save(userPaymentCard)
    }

    async delete(id:number, userId:number):Promise<void> {
        const user = await userService.findById(userId)
        if (!user) {
            throw ErrorResponse.notFound('USER_NOT_FOUND')
        }
        const userPaymentCard = await this.repository.findOne({where:{ id, user:{id:user.id}} })
        if (!userPaymentCard) {
            throw ErrorResponse.notFound('USER_PAYMENT_CARD_NOT_FOUND')
        }
        await this.repository.remove(userPaymentCard)
    }
}

export default new Service()