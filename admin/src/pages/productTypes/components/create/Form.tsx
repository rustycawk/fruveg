import React, { useState } from 'react'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { ProductTypeCreate } from '../../../../types/productTypes/ProductTypeCreate'
import productTypeService from '../../../../services/productType-service'

type Props = {
    update: () => void
    handleClose: () => void
}

const Form = (props: Props) => {

    const [formValues, setFormValues] = useState<ProductTypeCreate>(new ProductTypeCreate())
    const [error, setError] = useState<string | null>(null)
    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        const formData = new FormData()
        formData.append('name', formValues.name)
        formData.append('description', formValues.description)
        if(formValues.logo) {
            formData.append('logo', formValues.logo)
        }
        productTypeService.create(formData).then((response) => {
            props.update()
            props.handleClose()
        }).catch((error) => {
            console.log(error)
            setError('Ошибка при создании типа продукта')
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