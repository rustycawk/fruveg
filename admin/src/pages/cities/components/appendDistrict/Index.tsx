import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Form from './Form';

type Props = {
  update: () => void
  cityId: number
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
          <Modal.Title>Добавление города</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form handleClose={handleClose} update={props.update} cityId={props.cityId} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Index