import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Form from './Form';
import { ICity } from '../../../../types/cities/ICity';

type Props = {
    item: ICity,
    update: () => void
}

const Index = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="warning" size='sm' onClick={handleShow}>
                Редактировать
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать "{props.item.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form handleClose={handleClose} update={props.update} item={props.item} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Index