import { Repository } from "typeorm"
import { UserAddress } from "../../entities/userAddress.entity"
import { AppDataSource } from "../../data-source"
import { UserAddressUpdateDto } from "./dto/userAddressUpdate.dto"
import { UserAddressCreateDto } from './dto/userAddressCreate.dto'
import userService from '../user/service'
import cityService from '../city/service'
import cityDistrictService from '../cityDistrict/service'
import { ErrorResponse } from "../../middlewares/types/errorResponse"

class Service {
    repository: Repository<UserAddress>
    constructor() {
        this.repository = AppDataSource.getRepository(UserAddress)
    }
    async findAll(userId: number): Promise<UserAddress[]> {
        return this.repository.find({ relations: ['city', 'cityDistrict'], where: { user: { id: userId } } })
    }

    async findOne(id: number): Promise<UserAddress | null> {
        return this.repository.findOne({ 
            where:{id},
            relations:['city','cityDistrict']
         })
    }

    async create(dto: UserAddressCreateDto, userId: number): Promise<UserAddress> {
        const user = await userService.findById(userId)
        if (!user) {
            throw ErrorResponse.notFound('USER_NOT_FOUND')
        }
        const userAddress = new UserAddress()
        userAddress.user = user
        if (dto.cityId) {
            const city = await cityService.findOne(dto.cityId)
            if (!city) {
                throw ErrorResponse.notFound('CITY_NOT_FOUND')
            }
            userAddress.city = city
        }
        if (dto.cityDistrictId) {
            const cityDistrict = await cityDistrictService.findOne(dto.cityDistrictId)
            if (!cityDistrict) {
                throw ErrorResponse.notFound('CITY_DISTRICT_NOT_FOUND')
            }
            userAddress.cityDistrict = cityDistrict
        }
        userAddress.street = dto.street
        userAddress.house = dto.house
        userAddress.roomNumber = dto.roomNumber
        userAddress.floor = dto.floor
        userAddress.comments = dto.comments
        return this.repository.save(userAddress)
    }

    async update(dto: UserAddressUpdateDto, userId: number): Promise<UserAddress> {
        const user = await userService.findById(userId)
        if (!user) {
            throw ErrorResponse.notFound('USER_NOT_FOUND')
        }
        const userAddress = await this.repository.findOne({where:{user:{id:user.id},id:dto.id}})
        if (!userAddress) {
            throw ErrorResponse.notFound('USER_ADDRESS_NOT_FOUND')
        }
        if (dto.cityId) {
            const city = await cityService.findOne(dto.cityId)
            if (!city) {
                throw ErrorResponse.notFound('CITY_NOT_FOUND')
            }
            userAddress.city = city
        }
        if (dto.cityDistrictId) {
            const cityDistrict = await cityDistrictService.findOne(dto.cityDistrictId)
            if (!cityDistrict) {
                throw ErrorResponse.notFound('CITY_DISTRICT_NOT_FOUND')
            }
            userAddress.cityDistrict = cityDistrict
        }
        userAddress.street = dto.street ?? userAddress.street
        userAddress.house = dto.house ?? userAddress.house
        userAddress.roomNumber = dto.roomNumber ?? userAddress.roomNumber
        userAddress.floor = dto.floor ?? userAddress.floor
        userAddress.comments = dto.comments ?? userAddress.comments
        return this.repository.save(userAddress)
    }

    async delete(id: number, userId: number): Promise<void> {
        const user = await userService.findById(userId)
        if (!user) {
            throw ErrorResponse.notFound('USER_NOT_FOUND')
        }
        const userAddress = await this.repository.findOne({where:{ id, user:{id:user.id} }})
        if (!userAddress) {
            throw ErrorResponse.notFound('USER_ADDRESS_NOT_FOUND')
        }
        userAddress.deleted = true
        await this.repository.save(userAddress)
    }
}

export default new Service()