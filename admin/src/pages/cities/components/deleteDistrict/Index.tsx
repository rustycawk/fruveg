import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Form from './Form';
import { ICityDistrict } from '../../../../types/cities/ICityDistrict';

type Props = {
    item:ICityDistrict,
    update: () => void
}

const Index = (props: Props) => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="danger" size='sm' onClick={handleShow}>
        Удалить 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление "{props.item.name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form handleClose={handleClose} update={props.update} item={props.item}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Index