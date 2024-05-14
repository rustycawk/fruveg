import { Repository } from "typeorm"
import { LoginDto } from "./dto/login.dto"
import userService from "../user/service"
import mailService from '../mail/service'
import bcrypt from 'bcrypt'
import { ErrorResponse } from "../../middlewares/types/errorResponse"
import { RegisterDto } from "./dto/register.dto"
import { UserCreateDto } from "../user/dto/userCreate.dto"
import { PayloadDto } from "./dto/payload.dto"
import jwt from 'jsonwebtoken'
import ResetPasswordDto from "./dto/resetPassword.dto"
import { ResetPasswordRequest } from "../../entities/resetPasswordRequest.entity"
import { AppDataSource } from "../../data-source"
import MailOptionDto from "../mail/dto/mailOption.dto"
class Service {

    resetPasswordRequestRepository:Repository<ResetPasswordRequest>
    
    constructor() {
        this.resetPasswordRequestRepository = AppDataSource.getRepository(ResetPasswordRequest)
    }

    async login(dto:LoginDto):Promise<[PayloadDto, string]> {
        const user = await userService.findByEmail(dto.email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        if(!bcrypt.compareSync(dto.password, user.passwordHash)) {
            throw ErrorResponse.unauthorized("INCORRECT_PASSWORD")
        }
        if(!user.isActive) {
            await mailService.send(MailOptionDto.registerComplete(user.email, user.key!))
            throw ErrorResponse.unauthorized("USER_NOT_ACTIVATED")
        }
        const payload:PayloadDto = {
            id:user.id,
            email:user.email,
            phone:user.phone
        }
        return [payload, this.generateToken(payload)]
    }
    async refresh(payload:PayloadDto):Promise<[PayloadDto, string]> {
        console.log(payload)
        return [payload, this.generateToken(payload)]
    }
    async register(dto:RegisterDto):Promise<void> {
        let existUser = await userService.findByEmail(dto.email)
        if(existUser) {
            throw ErrorResponse.badRequest("USER_ALREADY_EXISTS")
        }
        const userCreateDto:UserCreateDto = {
            phone:dto.phone,
            email:dto.email,
            name:dto.name,
            lastName:dto.lastName,
            password:dto.password
        }
        const user = await userService.create(userCreateDto)
        const activationKey = await userService.setActivationKey(user.email)
        await mailService.send(MailOptionDto.registerComplete(user.email, activationKey))
    }

    async activate(email:string, key:string):Promise<void> {
        await userService.activateUser(email, key)
        await mailService.send(MailOptionDto.activated(email))
    }

    async resetPassword(email:string):Promise<void> {
        const user = await userService.findByEmail(email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        const resetPasswordRequest = new ResetPasswordRequest()
        resetPasswordRequest.email = user.email
        resetPasswordRequest.key = (await  bcrypt.hash(user.email, 5)).replace(/\//g, '')
        await this.resetPasswordRequestRepository.save(resetPasswordRequest)
        await mailService.send(MailOptionDto.resetPassword(user.email, resetPasswordRequest.key))
    }

    async resetPasswordPost(dto:ResetPasswordDto):Promise<void> {
        const resetPasswordRequest = await this.resetPasswordRequestRepository.findOne({
            where:{
                key:dto.key
            }
        })
        if(!resetPasswordRequest) {
            throw ErrorResponse.notFound("RESET_PASSWORD_REQUEST_NOT_FOUND")
        }
        await userService.setPassword(resetPasswordRequest.email, dto.newPassword)
        resetPasswordRequest.deleted = true
        await this.resetPasswordRequestRepository.save(resetPasswordRequest)

        await mailService.send(MailOptionDto.passwordChanged(resetPasswordRequest.email))
    }

    private generateToken(payload:PayloadDto) {
        return jwt.sign({
            id:payload.id,
            email:payload.email,
            phone:payload.phone
        }, process.env.JWT_SECRET!, { expiresIn: '24d' })
    }
}

export default new Service()