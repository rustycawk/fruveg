import React, { useState } from 'react'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { ICity } from '../../../../types/cities/ICity'
import cityService from '../../../../services/city-service'

type Props = {
    handleClose: () => void
    update: () => void
    item: ICity
}

const Form = (props: Props) => {

    const [name, setName] = useState<string>(props.item.name)
    const [error, setError] = useState<string | null>(null)

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        cityService.update(name,props.item.id).then((response) => {
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
            </FormGroup>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button type={'submit'}>Сохранить изменения</Button>

        </form>
    )
}

export default Form