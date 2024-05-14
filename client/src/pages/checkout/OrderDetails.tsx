import React, { useEffect, useState } from 'react'
import { IProfileAddress } from '../../types/profile/address/IProfileAddress'
import { IProfile } from '../../types/profile/IProfile'
import profileService from '../../services/profile-service'
import MakeOrderResponse from '../../types/basket/MakeOrderResponse'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'
import CreateAddress from '../profile/CreateAddress'
import CreatePayment from '../profile/CreatePayment'

type Props = {}

const OrderDetails = (props: Props) => {

    const { basketStore, orderStore } = useStores()

    const [profile, setProfile] = useState<IProfile | null>(null)

    const getProfileInfo = () => {
        profileService.getProfileInfo().then((response) => {
            setProfile(response.data)
        })
    }

    useEffect(() => {
        getProfileInfo()
    }, [])

    return <div className='checkout-order-details'>
        {
            profile && <>
                <h4>
                    Адрес доставки
                </h4>
                <p>Выберите адрес доставки или добавьте новый адреса</p>
                <ul className='checkout-order-address mb-4'>
                    {
                        profile.addresses.map((item, index) => {
                            return <li key={index}>
                                <div className={"checkout-order-address-item " + (item.id === orderStore.address?.id ? 'active' : '')}
                                    onClick={() => orderStore.setAddress(item)}>
                                    <p>{item.city?.name ?? ''} {item.cityDistrict?.name ?? ''}</p>
                                    <p>{item.street}, {item.house}, {item.roomNumber}, {item.floor} этаж</p>
                                </div>
                            </li>
                        })
                    }
                    <li>
                        <CreateAddress source={'checkout'} update={getProfileInfo}/>
                    </li>
                </ul>
                <hr />
                <h4 className='mt-5'>
                    Способ оплаты
                </h4>
                <p>Выберите карту или добавьте новую</p>
                <ul className='checkout-order-payment'>
                    {
                        profile.payments.map((item, index) => {
                            return <li key={index}>
                                <div className={"checkout-order-payment-item " + (item.id === orderStore.payment?.id ? 'active' : '')}
                                    onClick={() => orderStore.setPayment(item)}
                                >
                                    <p>{item.cardNumber} &nbsp;&nbsp;&nbsp; {item.expirationDate}</p>
                                    <p>{item.name}</p>
                                </div>
                            </li>
                        })
                    }
                    <li>
                        <CreatePayment source={'checkout'} update={getProfileInfo}/>
                    </li>
                </ul>

                <hr />

                <h4 className='mt-5'>Комментарий к заказу</h4>
                <textarea className='form-control' value={orderStore.comments}
                    onChange={(e) => orderStore.setComments(e.target.value)}
                ></textarea>
            </>
        }

    </div>
}

export default observer(OrderDetails)