import React, { useEffect, useState } from 'react'
import { ProductCreateRequest } from '../../../types/products/ProductCreateRequest'
import { IProductType } from '../../../types/productTypes/IProductType'
import productTypeService from '../../../services/productType-service'
import { Button } from 'react-bootstrap'
import productService from '../../../services/product-service'
import { ProductUpdateRequest } from '../../../types/products/ProductUpdateRequest'
import { IProduct } from '../../../types/products/IProduct'

type Props = {
    product:IProduct
    handleClose: () => void
    update:()=>void
}

const Form = (props: Props) => {
    const [formValue, setFormValue] = useState<ProductUpdateRequest>(new ProductUpdateRequest(props.product))
    const [productTypes, setProductTypes] = useState<IProductType[]>([])

    const [files,setFiles] = useState<FileList | null>(null)

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        productService.update(formValue, props.product.id).then((response)=>{
            props.update()
            props.handleClose()
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        productTypeService.findAll().then((response)=>{
            setProductTypes(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    return (
        <form onSubmit={handleForm}>
        <div className="form-group mb-3">
            <label className="form-label">Тип продукта</label>
            <select className='form-select' value={formValue.productTypeId} onChange={(e)=>{
                setFormValue((prev)=>{
                    return {
                        ...prev,
                        productTypeId: +e.target.value
                    }
                })
            }}>
                <option value="">-Выберите тип-</option>
                {
                    productTypes.map((productType)=>{
                        return <option key={productType.id} value={productType.id}>{productType.name}</option>
                    })
                }
            </select>
        </div>
            <div className="form-group mb-3">
                <label className="form-label">Название</label>
                <input className='form-control' value={formValue.name} onChange={(e) => setFormValue((prev) => ({
                    ...prev,
                    name: e.target.value
                }))} />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Артикул</label>
                <input className='form-control' value={formValue.article} onChange={(e) => setFormValue((prev) => ({
                    ...prev,
                    article: e.target.value
                }))} />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Розничная цена</label>
                <input className='form-control' type='number' value={formValue.price} onChange={(e) => setFormValue((prev) => ({
                    ...prev,
                    price: +e.target.value
                }))} />
            </div>

            <div className="d-flex mb-3" style={{ gap: 20 }}>

                <div className="form-group">
                    <label className="form-label">Размерность</label>
                    <input className='form-control' value={formValue.dimensions} onChange={(e) => setFormValue((prev) => ({
                        ...prev,
                        dimensions: e.target.value
                    }))} />
                    <span>*кг, шт, упак или кор</span>
                </div>

                <div className="form-group">
                    <label className="form-label">Кол-во за единицу продукта</label>
                    <input className='form-control' value={formValue.dimensionValue} onChange={(e) => setFormValue((prev) => ({
                        ...prev,
                        dimensionValue: +e.target.value
                    }))} />
                    <span>*например 1 кг или 4 штуки</span>
                </div>
            </div>

            <div className="d-flex mb-3" style={{ gap: 20 }}>

                <div className="form-group">
                    <label className="form-label">Цена зп опт</label>
                    <input className='form-control' value={formValue.whosalePrice} onChange={(e) => setFormValue((prev) => ({
                        ...prev,
                        whosalePrice: +e.target.value
                    }))} />
                    <span>обычно ниже розничной цены</span>
                </div>

                <div className="form-group">
                    <label className="form-label">Минимальный опт</label>
                    <input className='form-control' value={formValue.whosaleQuantity} onChange={(e) => setFormValue((prev) => ({
                        ...prev,
                        whosaleQuantity: +e.target.value
                    }))} />
                    <span>*Чтобы опт работал надо брать больше скольки?</span>
                </div>
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Описание товара</label>
                <textarea className='form-control' value={formValue.description} onChange={(e) => {
                    setFormValue((prev) => ({
                        ...prev,
                        description: e.target.value
                    }))
                }}>
                </textarea>
            </div>

            <Button type={'submit'}>Сохранить изменения</Button>


        </form>
    )
}

export default Form