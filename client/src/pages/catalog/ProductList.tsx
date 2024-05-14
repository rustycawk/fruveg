import React, { useEffect, useState } from 'react'
import ProductFilter from '../../types/catalog/ProductFilter'
import catalogService from '../../services/catalog-service'
import { IProduct } from '../../types/catalog/IProduct'
import ProductListItem from './ProductListItem'
import { Form } from 'react-bootstrap'

type Props = {
    filter: ProductFilter
}

const ProductList = (props: Props) => {

    const [filter, setFilter] = useState<ProductFilter>(props.filter)
    const [products, setProducts] = useState<IProduct[]>([])

    const getProducts = (filterData: ProductFilter) => {
        catalogService.getProducts(filterData).then((response) => {
            setProducts(response.data[0])
        })
    }

    useEffect(() => {
        setFilter(prev => ({ ...prev, ...props.filter, query:'' }))
        getProducts({ ...filter, ...props.filter, query:'' })
    }, [props.filter])

    return <div className='product-list-container'>
       
       {
        props.filter.type==='all' && <Form className='d-flex mb-3' style={{gap:20}}>
            <Form.Group className='flex-grow-1'>
                <Form.Label>Поиск в категории</Form.Label>
                <Form.Control type="text" placeholder='начинайте вводить название или артикул'
                 value={filter.query} onChange={(e) => {
                    setFilter(prev => ({ ...prev, query: e.target.value }))
                    getProducts({ ...filter, query: e.target.value })
                 }} />
            </Form.Group>
        </Form>
       }

        <ul className="product-list">
            {
                products.map((item, index) => {
                    return <ProductListItem key={index} product={item} />
                })
            }
        </ul>
    </div>
}

export default ProductList