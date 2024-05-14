import React from 'react'
import { IProfilePayment } from '../../types/profile/payment/IProfilePayment'
import CreatePayment from './CreatePayment'

type Props = {
    payments: IProfilePayment[],
    update: () => void
}

const Payments = (props: Props) => {
    return (
        <div className="card card-body border-0">
            <h4>Способы оплаты</h4>

            <div>
                <CreatePayment source='profile' update={props.update} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Название карты</th>
                        <th>Номер карты</th>
                        <th>Срок действия</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.payments.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.cardNumber}</td>
                                <td>{item.expirationDate}</td>
                                <td></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Payments