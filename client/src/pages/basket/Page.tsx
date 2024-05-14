import React from 'react'
import { Container } from 'react-bootstrap'
import ProductList from './BasketProductList'
import BasketTotal from './BasketTotal'
import { useStores } from '../../store/MobXProvider'
import { Link } from 'react-router-dom'
import APP_CONFIG from '../../app.config'
import { observer } from 'mobx-react-lite'

type Props = {}

const Page = (props: Props) => {
  const { basketStore } = useStores()
  return (
    <>
      <div className="title-banner">
        <img src={APP_CONFIG.BASKET_BANNER} alt="" />
        <div className="title-banner-content">
        <Container><h2>Корзина</h2></Container>
        </div>
      </div>
      <Container className='mt-5'>


        {
          basketStore.getBasketProductsCount() > 0 ?
            <>
              <div className="basket-products-container">
                <ProductList />
                <BasketTotal />
              </div>
            </> :
            <>
              <p>Ваша корзина пуста</p>
              <Link to="/catalog" className='btn btn-primary'>Перейти в каталог</Link>
            </>
        }

      </Container>
    </>
  )
}

export default observer(Page)