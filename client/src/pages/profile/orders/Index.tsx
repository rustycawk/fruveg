import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { IOrder } from '../../../types/profile/IOrder'
import basketService from '../../../services/basket-service'
import { formatDate, formatNumberWithSpaces } from '../../../helpers/functions'
import OrderProducts from './OrderProducts'
import StatusHistory from './StatusHistory'

type Props = {}

const Index = (props: Props) => {

    const [list, setList] = useState<IOrder[]>([])

    const update = () => {
        basketService.getOrders().then((response) => {
            setList(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <div className='card card-body border-0'>
            <h4>Мои заказы</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Номер</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item) => {
                        return <tr>
                            <td>{item.id}</td>
                            <td>{formatDate(item.date)}</td>
                            <td>{formatNumberWithSpaces(item.orderProducts.reduce((a, b) => a + b.salePrice * b.amount, 0))} <i className="fa fa-tenge"></i></td>
                            <td>{item.statusHistories[0].status.name}</td>
                            <td>
                                <OrderProducts products={item.orderProducts}/>
                                <StatusHistory history={item.statusHistories}/>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Index