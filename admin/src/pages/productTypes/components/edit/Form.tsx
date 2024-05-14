import React, { useState } from 'react'
import { IProductType } from '../../../../types/productTypes/IProductType'
import { Button, Figure, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { ProductTypeUpdate } from '../../../../types/productTypes/ProductTypeUpdate'
import APP_CONFIG from '../../../../app.config'
import productTypeService from '../../../../services/productType-service'

type Props = {
    handleClose: () => void
    update: () => void
    item: IProductType
}

const Form = (props: Props) => {

    const [formValues, setFormValues] = useState<ProductTypeUpdate>(new ProductTypeUpdate(props.item))
    const [error, setError] = useState<string | null>(null)

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        let formData = new FormData()
        formData.append('name', formValues.name)
        formData.append('description', formValues.description)
        if (formValues.logo) {
            formData.append('logo', formValues.logo)
        }
        productTypeService.update(formData, props.item.id).then((response) => {
            props.update()
            props.handleClose()
        }).catch((error) => {
            setError('Ошибка при сохранений изменений')
        })
    }

    return (
        <form onSubmit={handleForm}>
            <FormGroup className='mb-3'>
                <FormLabel>Название</FormLabel>
                <FormControl type="text"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    autoFocus
                />
            </FormGroup>

            <FormGroup className='mb-3'>
                <FormLabel>Описание</FormLabel>
                <FormControl
                    rows={4}
                    value={formValues.description}
                    as={'textarea'}
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    autoFocus
                />
            </FormGroup>

            <FormGroup className='mb-3'>
                <FormLabel>Иконка (лого)</FormLabel>
                <div>
                    <Figure>
                        <Figure.Image
                            width={60}
                            src={APP_CONFIG.API_URL + props.item.logo}
                        />
                        <Figure.Caption>
                            Текущая иконка
                        </Figure.Caption>
                    </Figure>
                </div>
                <input type='file' className='form-control'
                    onChange={(e) => setFormValues({ ...formValues, logo: e.target.files?.[0] })}
                />
            </FormGroup>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button type={'submit'}>Сохранить изменения</Button>

        </form>
    )
}

export default Form