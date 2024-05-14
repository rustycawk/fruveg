import React from 'react'
import CreateAddress from './CreateAddress'
import { IProfileAddress } from '../../types/profile/address/IProfileAddress'

type Props = {
    update: () => void
    addresses: IProfileAddress[]
}

const Addresses = (props: Props) => {
    return (
        <div className='card card-body border-0'>

            <h4>Адреса</h4>

            <div>
                <CreateAddress source='profile' update={props.update} />
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Адресс</th>
                        <th>Комментарий</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.addresses.map((item, index) => (
                            <tr key={index}>
                                <td>{item.street}, {item.house}, {item.roomNumber}</td>
                                <td>{item.comments}</td>
                                <td></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Addresses