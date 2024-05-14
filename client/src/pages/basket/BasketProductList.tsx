import React from 'react'
import { useStores } from '../../store/MobXProvider'
import BasketProductListItem from './BasketProductListItem'
import { observer } from 'mobx-react-lite'

type Props = {}

const BasketProductList = (props: Props) => {

    const {basketStore} = useStores()

  return <ul className='basket-product-list'>
    {
        basketStore.products.map((item) => {
            return <BasketProductListItem key={item.productId} product={item}/>
        })
    }
  </ul>
}

export default observer(BasketProductList)