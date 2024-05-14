import React, { useState } from 'react'
import { formatNumberWithSpaces } from '../../helpers/functions'
import { useStores } from '../../store/MobXProvider'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import basketService from '../../services/basket-service'
import { useNavigate } from 'react-router-dom'

type Props = {}

const CheckoutTotal = (props: Props) => {

    const { basketStore, orderStore } = useStores()
    const navigator = useNavigate()

    const handleMakeOrder = () => {
        basketService.makeOrder({
            userAddressId: orderStore.address?.id,
            userPaymentCardId: orderStore.payment?.id,
            products: basketStore.products,
            comments: orderStore.comments
        }).then((response) => {
            setNewOrder(response.data)
            handleShow()
        }).catch((error) => {
            console.log(error)
        })
    }

    const [newOrder, setNewOrder] = useState<any>({})

    const [show, setShow] = useState<boolean>(false)
    const handleClose = () => {
        setShow(false);

        navigator('/profile/orders')
    }
    const handleShow = () => {
        setShow(true);
    }

    return (
        <>
            <div className='checkout-total'>
                <h3>Ваш заказ</h3>

                <p className="d-flex justify-content-between">
                    <span>Продукты</span>
                    <span>{formatNumberWithSpaces(basketStore.getBasketTotal())} <i className="fa-solid fa-tenge-sign"></i></span>
                </p>

                <p className="d-flex justify-content-between">
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="button-tooltip" {...props}>
                            Для корзины от 6 000 <i className="fa-solid fa-tenge-sign"></i> <br /> доставка бесплатная, <br /> до 6 000 <i className="fa-solid fa-tenge-sign"></i> - 600 <i className="fa-solid fa-tenge-sign"></i>
                        </Tooltip>}
                    >
                        <span>Доставка</span>
                    </OverlayTrigger>
                    <span>{basketStore.getBasketTotal() > 6000 ? 'Бесплатно' : '600'} <i className="fa-solid fa-tenge-sign"></i></span>
                </p>

                <p className="d-flex justify-content-between">
                    <span>Адрес</span>
                    <span>
                        {
                            orderStore.address && `${orderStore.address.street} ${orderStore.address.house}, ${orderStore.address.roomNumber}`
                        }
                    </span>
                </p>

                <p className="d-flex justify-content-between">
                    <span>Оплата</span>
                    <span>
                        {
                            orderStore.payment && `${orderStore.payment.cardNumber}`
                        }
                    </span>
                </p>

                <hr />

                <h4 className='d-flex justify-content-between'>
                    <span>Итоговая сумма</span>
                    <span>{formatNumberWithSpaces(basketStore.getBasketTotal() + (basketStore.getBasketTotal() > 6000 ? 0 : 600))} <i className="fa-solid fa-tenge-sign"></i></span>
                </h4>

                <Button onClick={() => handleMakeOrder()} className='mt-4 btn btn-primary'>Оформить заказ</Button>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Поздравляем!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        newOrder.id && <>
                            <h4>Номер заказа: <span className='text-success'>#{newOrder.id}</span></h4>

                            <h5> Ваш заказ успешно оформлен!</h5>
                        </>
                    }

                    <Button onClick={handleClose} className='mt-5'>К моим заказам</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default observer(CheckoutTotal)