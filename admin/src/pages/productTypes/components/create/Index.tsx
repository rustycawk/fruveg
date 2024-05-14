import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Form from './Form';

type Props = {
  update: () => void
}

const Index = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" className='mb-3' onClick={handleShow}>
        + Добавить
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление типа продуктов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form handleClose={handleClose} update={props.update}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Index