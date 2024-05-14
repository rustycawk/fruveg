import React from 'react'
import productService from '../../../services/product-service'
import { Button } from 'react-bootstrap'

type Props = {
    id: number
    update: () => void
    handleClose: () => void
}

const Form = (props: Props) => {


    const handleForm = (e: React.FormEvent)=>{
        productService.delete(props.id).then((response)=>{
            props.update()
            props.handleClose()
        }).catch((error)=>console.log(error))
    }

  return (
    <form onSubmit={handleForm}>
        <Button variant='danger' type='submit'>Удалить</Button>
    </form>
  )
}

export default Form