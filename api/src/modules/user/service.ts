import { Repository } from "typeorm"
import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { UserCreateDto } from "./dto/userCreate.dto"
import bcrypt from 'bcrypt'
import { UserUpdateDto } from "./dto/userUpdate.dto"
import { ErrorResponse } from "../../middlewares/types/errorResponse"
import { UserUpdatePasswordDto } from "./dto/userUpdatePassword.dto"

class Service {
    repository: Repository<User>
    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async findByEmail(query: string): Promise<User | null> {
        return this.repository.findOne({
            where: { email: query },
            relations: ['userAddresses', 'userAddresses.city', 'userAddresses.cityDistrict', 'userPaymentCards']
        })
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOne({ where: { id }, relations: ['userAddresses', 'userAddresses.city', 'userAddresses.cityDistrict', 'userPaymentCards'] })
    }

    async create(dto: UserCreateDto): Promise<User> {
        const user = new User()
        user.email = dto.email
        user.phone = dto.phone
        user.name = dto.name
        user.lastName = dto.lastName
        user.passwordHash = await bcrypt.hash(dto.password, 5)
        return this.repository.save(user)
    }

    async update(dto: UserUpdateDto): Promise<User> {
        const user = await this.findById(dto.id)
        if (!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        user.name = dto.name ?? user.name
        user.lastName = dto.lastName ?? user.lastName
        user.phone = dto.phone ?? user.phone
        user.email = dto.email ?? user.email
        return this.repository.save(user)
    }

    async updatePassword(dto: UserUpdatePasswordDto): Promise<User> {
        const user = await this.findById(dto.id)
        if (!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        if (!bcrypt.compareSync(dto.password, user.passwordHash)) {
            throw ErrorResponse.unauthorized("INCORRECT_PASSWORD")
        }
        user.passwordHash = await bcrypt.hash(dto.newPassword, 5)
        return this.repository.save(user)
    }

    async setPassword(email:string, password:string):Promise<void> {
        const user = await this.findByEmail(email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        user.passwordHash = await bcrypt.hash(password, 5)
        await this.repository.save(user)
    }

    async setActivationKey(email:string):Promise<string>{
        const user = await this.findByEmail(email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        user.key = (await bcrypt.hash(user.email, 5)).replace(/\//g,'')
        await this.repository.save(user)
        return user.key
    }

    async activateUser(email:string, key:string):Promise<void> {
        const user = await this.findByEmail(email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        if(user.key !== key) {
            throw ErrorResponse.unauthorized("INCORRECT_KEY")
        }
        user.isActive = true
        await this.repository.save(user)
    }
}


export default new Service()