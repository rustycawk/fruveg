import React, { useEffect, useState } from 'react'
import MakeOrderProductItem from '../../types/basket/MakeOrderProductItem'
import { IProduct } from '../../types/catalog/IProduct'
import catalogService from '../../services/catalog-service'
import APP_CONFIG from '../../app.config'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store/MobXProvider'
import { formatNumberWithSpaces } from '../../helpers/functions'

type Props = {
    product: MakeOrderProductItem
}

const BasketProductListItem = (props: Props) => {

    const [product, setProduct] = useState<IProduct | null>(null)
    const [step, setStep] = useState<number>(1)

    const { basketStore } = useStores()

    useEffect(() => {
        catalogService.getProduct(props.product.productId).then((response) => {
            setProduct(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return <li>
        {
            product && <div className="basket-product-list-item">
                <img src={APP_CONFIG.API_URL + product.images[0]} alt="" />

                <div className='flex-grow-1 d-flex justify-content-between'>
                    <div className='flex-grow-1'>
                        <p className='basket-product-list-item-name'>
                            {product.name}
                        </p>
                        <div className="basket-product-list-item-counter d-flex align-items-center" style={{gap:50}}>
                            <InputGroup size="sm" className='position-relative'>
                                <Button id="btnGroupAddon2"
                                    onClick={() => basketStore.setProductAmount(props.product.productId, props.product.amount
                                        - step)}
                                    disabled={props.product.amount === step}>-</Button>
                                <Form.Control
                                    type="number"
                                    defaultValue={props.product.amount}
                                    value={props.product.amount}
                                    min={step}
                                    step={1}
                                    onChange={(event) => {
                                        basketStore.setProductAmount(props.product.productId, +event.target.value)
                                    }}
                                    onBlur={(event) => {
                                        if (+event.target.value < step) {
                                            basketStore.setProductAmount(props.product.productId, step)
                                        }
                                    }}
                                />
                                <InputGroup.Text>{product.dimensions}</InputGroup.Text>
                                <Button id="btnGroupAddon2"
                                    onClick={() => basketStore.setProductAmount(props.product.productId, props.product.amount + step)}
                                >+</Button>
                            </InputGroup>
                            <div className="basket-product-list-item-saleType flex-grow-1">
                                <Form.Check
                                    defaultChecked={props.product.saleType === 'retail'}
                                    type={'radio'}
                                    label={`В Розницу`}
                                    name={"saleType-" + props.product.productId}
                                    onChange={() => {
                                        basketStore.changeSaleType(props.product, 'retail')
                                        setStep(1)
                                        basketStore.setProductAmount(props.product.productId, 1)
                                        basketStore.changePrice(props.product, product.price)
                                    }}
                                />
                                <Form.Check
                                    defaultChecked={props.product.saleType === 'wholesale'}
                                    type={'radio'}
                                    label={`Оптом`}
                                    name={"saleType-" + props.product.productId}
                                    onChange={() => {
                                        basketStore.changeSaleType(props.product, 'wholesale')
                                        setStep(product.whosaleQuantity)
                                        basketStore.setProductAmount(props.product.productId, product.whosaleQuantity)
                                        basketStore.changePrice(props.product, product.whosalePrice)
                                    }}
                                />
                            </div>
                        </div>

                    </div>

                    <div className='text-end'>
                        <button className='basket-product-list-item-delete' onClick={() => basketStore.removeProduct(props.product)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <p className='basket-product-list-item-price'>
                            {formatNumberWithSpaces(props.product.price * props.product.amount)} <i className="fa-solid fa-tenge-sign"></i>
                        </p>
                    </div>
                </div>



            </div>
        }
    </li>
}

export default observer(BasketProductListItem)