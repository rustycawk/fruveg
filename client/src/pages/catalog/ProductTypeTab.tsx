import React from 'react'
import { IProductType } from '../../types/catalog/IProductType'
import APP_CONFIG from '../../app.config'

type Props = {
    productType: IProductType
    selectedProductTypeId: number
    setSelectedProductTypeId: (id: number) => void
}

const ProductTypeTab = (props: Props) => {
    return <li className='catalog-product-type-tab'>
        <button
            className='catalog-product-type-tab-button'
            onClick={() => props.setSelectedProductTypeId(props.productType.id)}>
            <img src={APP_CONFIG.API_URL + props.productType.logo} alt="" />
            <div className={'catalog-product-type-tab-text ' + (props.productType.id === props.selectedProductTypeId ? 'active' : '')}>
                <span>{props.productType.name}</span>
                <img src={APP_CONFIG.PRODUCT_TYPE_TAB_BACKGROUP} alt="" />
            </div>
        </button>
    </li>
}

export default ProductTypeTab