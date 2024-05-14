import React from 'react'
import { Container } from 'react-bootstrap'
import { useStores } from '../../store/MobXProvider'
import { Link } from 'react-router-dom'
import OrderDetails from './OrderDetails'
import CheckoutTotal from './CheckoutTotal'
import APP_CONFIG from '../../app.config'
import { observer } from 'mobx-react-lite'

type Props = {}

const Page = (props: Props) => {

    const { authStore } = useStores()

    return <>
        <div className="title-banner">
            <img src={APP_CONFIG.CHECKOUT_BANNER} alt="" />
            <div className="title-banner-content">
                <Container><h2>Оформление заказа</h2></Container>
            </div>
        </div>
        <Container className='mt-5'>
            {
                authStore.isAuth ? <>
                    <div className="checkout-container">
                        <OrderDetails />
                        <CheckoutTotal />
                    </div>
                </>
                    : <>
                        <p>Для оформления заказа необходимо <Link className='text-primary' to="/auth/login/checkout">войти</Link> в аккаунт</p>
                    </>
            }
        </Container>
    </>
}

export default observer(Page)