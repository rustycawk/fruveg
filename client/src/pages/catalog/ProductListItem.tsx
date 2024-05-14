import React from 'react'
import { IProduct } from '../../types/catalog/IProduct'
import APP_CONFIG from '../../app.config'
import { Link } from 'react-router-dom'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'

type Props = {
    product: IProduct
}

const ProductListItem = (props: Props) => {

    const link = `/catalog/${props.product.id}`

    const { basketStore } = useStores()

    return <li>
        <div className='product-list-item'>

            <Link to={link}>
                <div className="product-list-item-images">
                    <img
                        src={APP_CONFIG.API_URL + props.product.images[0]}
                        alt="" className='product-list-item-image-main' />

                    {props.product.images[1] && <img
                        src={APP_CONFIG.API_URL + props.product.images[1]}
                        alt="" className='product-list-item-image-hover' />}
                </div>
            </Link>
            <small>Артикул: {props.product.article}</small>
            <Link to={link}>
                
                <p className='product-list-item-name'>{props.product.name}</p>
            </Link>

            <p className="product-list-item-price">
                <i className="fa-solid fa-tenge-sign me-1"></i>
                {props.product.price}
                <span className='ms-2'>
                    за {props.product.dimensionValue} {props.product.dimensions}
                </span>
            </p>
            {
                basketStore.isInBasket(props.product.id) ?
                    <Link to="/basket"><div className='product-list-item-go-to-basket'>К корзине</div> </Link>
                    :
                    <button className='product-list-item-add-cart'
                        onClick={() => basketStore.addProduct({
                            productId: props.product.id,
                            amount: 1,
                            price: props.product.price,
                            saleType:'retail'
                        })}>
                        <i className="fa-solid fa-cart-plus"></i>
                    </button>
            }
        </div>

    </li>
}

export default observer(ProductListItem)