import React, { useState } from 'react'
import { Button, FormGroup, FormLabel } from 'react-bootstrap'
import { IProductType } from '../../../../types/productTypes/IProductType'
import productTypeService from '../../../../services/productType-service'

type Props = {
    item: IProductType,
    update: () => void
    handleClose: () => void
}

const Form = (props: Props) => {
    const [error, setError] = useState<string | null>(null)
    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        productTypeService.delete(props.item.id).then((response) => {
            props.update()
            props.handleClose()
        }).catch((error) => {
            console.log(error)
            setError('Ошибка при удалении')
        })
    }
    return (
        <form onSubmit={handleForm}>
            <FormGroup className='mb-3'>
                <FormLabel>Вы уверены, что хотите удалить "{props.item.name}"</FormLabel>
            </FormGroup>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button type="submit" variant='danger'>Удалить</Button>
        </form>
    )
}

export default Form