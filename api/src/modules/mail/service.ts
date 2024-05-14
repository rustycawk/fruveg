import { Repository } from 'typeorm'
import { ErrorResponse } from '../../middlewares/types/errorResponse';
import MailOptionDto from './dto/mailOption.dto';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

class Service {

    transporter: nodemailer.Transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Mail.ru',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PWD
            }
        })
    }

    async send(dto: MailOptionDto) {
        try {
            let info = await this.transporter.sendMail(dto);
            console.log(info)
        } catch (e) {
            console.log(e)
            throw ErrorResponse.internal('ERROR_WHEN_SENDING_EMAIL', e)
        }
    }

}

export default new Service();