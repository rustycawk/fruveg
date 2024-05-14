import dotenv from 'dotenv'
import OrderDto from '../../order/dto/orderDto'
dotenv.config()

export default class MailOptionDto {
    from: string
    to!: string
    subject!: string
    html!: string
    constructor(to: string, subject: string, html: string) {
        this.from = process.env.SMTP_USER as string
        this.to = to
        this.subject = subject
        this.html = html
    }

    static registerComplete(email: string, key: string) {
        return new MailOptionDto(email,
            'Активация аккаунта',
            `<p> Для активации аккаунта перейдите по <a href="${process.env.CLIENT_URL}/auth/activate/${email}/${key}">Cсылке</a></p>`)
    }

    static resetPassword(email: string, key: string) {
        return new MailOptionDto(email,
            'Сброс пароля',
            `<p> Для сброса пароля перейдите по <a href="${process.env.CLIENT_URL}/auth/reset-password/${key}">Cсылке</a></p>`)
    }

    static passwordChanged(email: string) {
        return new MailOptionDto(email,
            'Пароль успешно заменен',
            `<p> Пароль успешно заменен. Вы можете в любой момент поменять пароль в <a href="${process.env.CLIENT_URL}/profile">личном кабинете</a></p>`)
    }

    static activated(email: string) {
        return new MailOptionDto(email,
            'Аккаунт успешно активирован',
            `<p> Аккаунт успешно активирован. Вы можете в любой момент войти в <a href="${process.env.CLIENT_URL}/profile">личный кабинет</a></p>`)
    }

    static makeOrder(email: string, order: OrderDto) {

        let html = `<p>Детали вашего заказа: </p>`
            + `<table>
        <tr>
            <th>Артикул</th>
            <th>Название</th>
            <th>Кол-во</th>
            <th>Цена</th>
            <th>Сумма</th>
        </tr>`

        for (let item of order.orderProducts) {
            html += `<tr>
                <td>${item.product.article}</td>
                <td>${item.product.name}</td>
                <td>${item.amount} x ${item.product.dimensionValue} ${item.product.dimensions}</td>
                <td>${item.salePrice}</td>
                <td>${item.amount * item.salePrice}</td>
            </tr>`
        }
        html += `<tr><td colspan="4">Итог</td><td>${order.orderProducts.reduce((a, b) => a + b.salePrice * b.amount, 0)}</td></tr></table>`

        html += `</br>`
            + `<p><b>Адрес доставки: </b> ${order.address.city?.name ?? ''}
            ${order.address.cityDistrict?.name ?? ''}
            ${order.address.street}, ${order.address.house}, ${order.address.roomNumber}, ${order.address.floor} этаж
       </p>`
            + `<p><b>Комментарии курьеру: </b> ${order.address.comments}</p>`


        return new MailOptionDto(email,
            `Заказ №${order.id} успешно создан`,
            html)
    }
}