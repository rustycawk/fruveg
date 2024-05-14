import React, { useState } from 'react'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import cityService from '../../../../services/city-service'

type Props = {
    update: () => void
    handleClose: () => void
    cityId:number
}

const Form = (props: Props) => {

    const [name, setName] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        cityService.appendDistrict(name,props.cityId).then((response) => {
            props.update()
            props.handleClose()
        }).catch((error) => {
            console.log(error)
            setError('Ошибка при создании')
        })
    }

    return (
        <form onSubmit={handleForm}>

            <FormGroup className='mb-3'>
                <FormLabel>Название</FormLabel>
                <FormControl type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value )}
                    autoFocus
                />
            </FormGroup>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button type={'submit'}>Сохранить</Button>

        </form>
    )
}

export default Form