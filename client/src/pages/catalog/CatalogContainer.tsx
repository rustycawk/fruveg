import React, { useEffect, useState } from 'react'
import { IProductType } from '../../types/catalog/IProductType'
import catalogService from '../../services/catalog-service'
import ProductTypeTab from './ProductTypeTab'
import ProductList from './ProductList'
import { Form } from 'react-bootstrap'

type Props = {
  type: 'all' | 'popular' | 'new'
}

const CatalogContainer = (props: Props) => {

  const [productTypes, setProductTypes] = useState<IProductType[]>([])
  const [productTypeId, setProductTypeId] = useState<number>(0)

  useEffect(() => {
    catalogService.getProductTypes().then((response) => {
      setProductTypes(response.data)
      setProductTypeId(response.data[0].id)
    }).catch((error) => {
      console.log(error)
    })
  }, [props.type])

  return <section className='catalog-container'>

    <ul className="catalog-product-type-tabs">
      {
        productTypes.map((item, index) => {
          return <ProductTypeTab 
          productType={item} 
          key={index} 
          selectedProductTypeId={productTypeId}
          setSelectedProductTypeId={setProductTypeId}
          />
        })
      }
    </ul>

    {
      productTypeId !== 0 && <ProductList filter={{
        productTypeId: productTypeId,
        type: props.type
      }} />
    }

  </section>
}

export default CatalogContainer