import React from 'react'
import { useStores } from '../../store/MobXProvider'
import { formatNumberWithSpaces } from '../../helpers/functions'
import { observer } from 'mobx-react-lite'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {}

const BasketTotal = (props: Props) => {
    const { basketStore } = useStores()
    return (
        <div className='basket-total'>
            <h3>Ваш заказ</h3>
            <p className="d-flex justify-content-between">
                <span>Продукты</span>
                <span>{formatNumberWithSpaces(basketStore.getBasketTotal())} <i className="fa-solid fa-tenge-sign"></i></span>
            </p>

            <p className="d-flex justify-content-between mb-0">
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

            <hr />

            <h4 className='d-flex justify-content-between'>
                <span>Итоговая сумма</span>
                <span>{formatNumberWithSpaces(basketStore.getBasketTotal() + (basketStore.getBasketTotal() > 6000 ? 0 : 600))} <i className="fa-solid fa-tenge-sign"></i></span>
            </h4>

            <Link to={'/checkout'} className='mt-4 btn btn-primary'>К оформлению заказа</Link>
        </div>
    )
}

export default observer(BasketTotal)