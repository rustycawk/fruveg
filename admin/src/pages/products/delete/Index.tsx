import React, { useState } from 'react'
import {ReactComponent as Trash} from '../../../shared/icons/Trash.svg'
import { Button, Modal } from 'react-bootstrap';
import { IProduct } from '../../../types/products/IProduct';
import Form from './Form';

type Props = {
  product:IProduct
  update:() => void
}

const Index = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" size={'sm'} onClick={handleShow}>
          <Trash width={16} height={16}/>
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Удаление продукта</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form handleClose={handleClose} update={props.update} id={props.product.id}/>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default Index