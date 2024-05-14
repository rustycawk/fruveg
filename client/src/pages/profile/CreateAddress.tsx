import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { ICity } from '../../types/city/ICity';
import profileService from '../../services/profile-service';
import AddressCreateResponse from '../../types/profile/address/AddressCreateResponse';

type Props = {
    source: 'checkout' | 'profile'
    update: () => void
}

const CreateAddress = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        getCities()
        setShow(true);
    }


    const [cities, setCities] = useState<ICity[]>([])

    const [formValues, setFormValues] = useState<AddressCreateResponse>(new AddressCreateResponse())

    const getCities = () => {
        profileService.getCities().then(res => {
            setCities(res.data)
        })
    }

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        profileService.appendAddress(formValues).then(res => {
            props.update()
            handleClose()
        }).catch(e => console.log(e))
    }

    return (
        <>
            {
                props.source === 'checkout' ?
                    <div className="checkout-order-address-item new-btn" onClick={handleShow}>
                        + Добавить
                    </div> :
                    <Button variant="primary" onClick={handleShow}>
                        + Добавить
                    </Button>
            }


            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление нового адреса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleForm}>
                        <div className="d-flex mb-3" style={{ gap: 20 }}>
                            <Form.Group className='flex-grow-1'>
                                <Form.Label>Город</Form.Label>
                                <Form.Select
                                    onChange={(e) => setFormValues((prev) => ({ ...prev, cityId: Number(e.target.value) }))}
                                    required={true}
                                >
                                    <option value=''>-выберите город-</option>
                                    {
                                        cities.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.name}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='flex-grow-1'>
                                <Form.Label>Район</Form.Label>
                                <Form.Select
                                    required={true}
                                    onChange={(e) => setFormValues((prev) => ({ ...prev, cityDistrictId: Number(e.target.value) }))}
                                >
                                    <option value=''>-выберите район-</option>
                                    {
                                        cities.filter(m => m.id === (formValues.cityId ?? 0)).length > 0
                                        && cities.filter(m => m.id === (formValues.cityId ?? 0))[0].districts.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.name}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="d-flex mb-3" style={{ gap: 20 }}>
                            <Form.Group>
                                <Form.Label>Улица</Form.Label>
                                <Form.Control value={formValues.street} onChange={(e) => setFormValues((prev) => ({ ...prev, street: e.target.value }))} required={true}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Дом</Form.Label>
                                <Form.Control value={formValues.house} onChange={(e) => setFormValues((prev) => ({ ...prev, house: e.target.value }))} required={true}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Квартира/офис</Form.Label>
                                <Form.Control value={formValues.roomNumber} onChange={(e) => setFormValues((prev) => ({ ...prev, roomNumber: e.target.value }))} required={true}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Этаж</Form.Label>
                                <Form.Control value={formValues.floor} onChange={(e) => setFormValues((prev) => ({ ...prev, floor: e.target.value }))} required={true}/>
                            </Form.Group>
                        </div>

                        <Form.Group className='mb-3'>
                            <Form.Label>Комментарий</Form.Label>
                            <Form.Control as={"textarea"} value={formValues.comments} onChange={(e) => setFormValues((prev) => ({ ...prev, comments: e.target.value }))}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Сохранить адрес
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateAddress