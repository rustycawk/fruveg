import React, { useEffect, useState } from 'react'
import { useStores } from '../../store/MobXProvider'
import { IProduct } from '../../types/products/IProduct'
import productService from '../../services/product-service'
import { ProductFilter } from '../../types/products/PorductFilter'
import ImageToggle from '../../components/ImageToggle'
import EditModal from './edit/Index'
import DeleteModal from './delete/Index'
import { IProductType } from '../../types/productTypes/IProductType'
import productTypeService from '../../services/productType-service'
import CreateModal from './create/Index'
import ManageImagesModal from './manageImages/Index'

type Props = {}

const Page = (props: Props) => {
    const { routerStore } = useStores()
    const [list, setList] = useState<IProduct[]>([])
    const [error, setError] = useState<string | null>(null)
    const [productTypes,setProductTypes] = useState<IProductType[]>([])

    const [filter, setFilter] = useState<ProductFilter>(new ProductFilter())

    useEffect(()=>{
        routerStore.setCurrentPath('/products')
        productTypeService.findAll().then((response)=>{
            setProductTypes(response.data)
        })
    },[])

    const update = () => {
        setError(null)
        productService.findAll(filter).then((response) => {
            setList(response.data[0])
        }).catch((error) => {
            setError("Ошибка при получении списка")
            console.log(error)
        })
    }

    useEffect(() => {
        update()
    }, [filter])

    return (
        <>
            <h3>Продукты</h3>

            <CreateModal update={update}/>

            <div className="card">
                <div className="card-header">Поиск</div>
                <div className="card-body">

                    <div className="form-group mb-3">
                        <label  className="form-label">Тип продукта</label>
                        <select  className="form-select" value={filter.productTypeId} onChange={(e)=>{
                            setFilter((prev)=>({
                                ...prev,
                                productTypeId:+e.target.value
                            }))
                        }}>
                            <option value="0">Все</option>
                            {
                                productTypes.map((item)=>{
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <input type="text" className="form-control" placeholder='начните вводить название или артикул' value={filter.query} onChange={(e) => setFilter((prev) => {
                            return {
                                ...prev,
                                query: e.target.value
                            }
                        })} />
                    </div>
                </div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Картинка</th>
                        <th>Наименование</th>
                        <th>Артикул</th>
                        <th>Цена</th>
                        <th>Цена опт / мин опт</th>
                        <th>Операции</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.length > 0 && list.map((item) => {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    {
                                        item.images.filter(m => !m.deleted).length > 0
                                        && <ImageToggle
                                            title={item.article + " | " + item.name}
                                            src={item.images.filter(m => !m.deleted)[0].path}
                                            style={{ width: 80 }}
                                            className='border rounded'
                                        />
                                    }
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.article}
                                </td>
                                <td>
                                    {item.price} тг
                                </td>
                                <td>
                                    {item.whosalePrice} тг / {item.whosaleQuantity} шт
                                </td>
                                <td>
                                    <div className="d-flex" style={{ gap: 10 }}>
                                        <EditModal product={item} update={update}/>
                                        <ManageImagesModal product={item} update={update}/>
                                        <DeleteModal product={item} update={update}/>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default Page