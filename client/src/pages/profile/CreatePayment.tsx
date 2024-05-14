import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import profileService from '../../services/profile-service';
import PaymentCreateResponse from '../../types/profile/payment/PaymentCreateResponse';
import InputMask from 'react-input-mask';

type Props = {
    source: 'checkout' | 'profile'
    update: () => void
}

const CreatePayment = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }


    const [formValues, setFormValues] = useState<PaymentCreateResponse>(new PaymentCreateResponse())


    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        profileService.appendPayment(formValues).then(res => {
            props.update()
            handleClose()
        }).catch(e => console.log(e))
    }

    return (
        <>
            {
                props.source === 'checkout' ?
                    <div className="checkout-order-payment-item new-btn" onClick={handleShow}>
                        + Добавить
                    </div> :
                    <Button variant="primary" onClick={handleShow}>
                        + Добавить
                    </Button>
            }


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление нового адреса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleForm}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Название</Form.Label>
                            <Form.Control value={formValues.name} onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))} />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Номер карты</Form.Label>
                            <InputMask
                                mask="9999 9999 9999 9999"
                                maskChar=""
                                className="form-control"
                                placeholder="введите 16-ти значный номер карты"
                                aria-describedby="creditCardHelpBlock"
                                value={formValues.cardNumber}
                                onChange={(e) => setFormValues((prev) => ({ ...prev, cardNumber: e.target.value }))}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Номер карты</Form.Label>
                            <InputMask
                                mask="99/9999"
                                maskChar=""
                                className="form-control"
                                placeholder="введите срок действия карты в формате MM/YYYY"
                                value={formValues.expirationDate}
                                onChange={(e) => setFormValues((prev) => ({ ...prev, expirationDate: e.target.value }))}
                            />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Сохранить карту
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreatePayment