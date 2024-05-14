import { ErrorResponse } from "../../middlewares/types/errorResponse";
import { PayloadDto } from "../auth/dto/payload.dto";
import { UserUpdateDto } from "../user/dto/userUpdate.dto";
import { UserUpdatePasswordDto } from "../user/dto/userUpdatePassword.dto";
import userService from '../user/service'
import userAddressService from '../userAddress/service'
import userPaymentCardService from '../userPaymentCard/service'
import { UserAddressCreateDto } from "../userAddress/dto/userAddressCreate.dto";
import { ProfileInfoDto } from "./dto/profileInfo.dto";
import { ProfileAddressDto } from "./dto/profileAddress.dto";
import { UserAddressUpdateDto } from "../userAddress/dto/userAddressUpdate.dto";
import { ProfilePaymentCardDto } from "./dto/profilePaymentCard.dto";
import { UserPaymentCardCreateDto } from "../userPaymentCard/dto/userPaymentCardCreate.dto";
import { UserPaymentCardUpdateDto } from "../userPaymentCard/dto/userPaymentCardUpdate.dto";
import mailService from '../mail/service'
import MailOptionDto from "../mail/dto/mailOption.dto";
import cityService from '../city/service'

class Service {
    async getProfileInfo(payload:PayloadDto):Promise<ProfileInfoDto> {
        const user = await userService.findByEmail(payload.email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        return new ProfileInfoDto(user)
    }

    //manage user info
    async updateBaseInfo(dto:UserUpdateDto, payload:PayloadDto):Promise<ProfileInfoDto> {
        const user = await userService.update({
            ...dto,
            id:payload.id
        })
        return new ProfileInfoDto(user)
    }

    async updatePassword(dto:UserUpdatePasswordDto, payload:PayloadDto):Promise<ProfileInfoDto> {
        const user = await userService.updatePassword({
            ...dto,
            id:payload.id
        })
        await mailService.send(MailOptionDto.passwordChanged(payload.email))
        return new ProfileInfoDto(user)
    }

    //address
    async appendAddress(dto:UserAddressCreateDto,payload:PayloadDto):Promise<ProfileAddressDto> {
        const address = await userAddressService.create(dto,payload.id)
        return new ProfileAddressDto(address)
    }

    async updateAddress(dto:UserAddressUpdateDto,payload:PayloadDto):Promise<ProfileAddressDto> {
        const address = await userAddressService.update(dto,payload.id)
        return new ProfileAddressDto(address)
    }

    async deleteAddress(id:number,payload:PayloadDto):Promise<void> {
        await userAddressService.delete(id,payload.id)
    }

    //payment card
    async appendPaymentCard(dto:UserPaymentCardCreateDto, payload:PayloadDto):Promise<ProfilePaymentCardDto> {
        const data = await userPaymentCardService.create(dto, payload.id)
        return new ProfilePaymentCardDto(data)
    }

    async updatePaymentCard(dto:UserPaymentCardUpdateDto,payload:PayloadDto):Promise<ProfilePaymentCardDto> {
        const data = await userPaymentCardService.update(dto, payload.id)
        return new ProfilePaymentCardDto(data)
    }

    async deletePaymentCard(id:number, payload:PayloadDto):Promise<void> {
        await userPaymentCardService.delete(id, payload.id)
    }
}

export default new Service()