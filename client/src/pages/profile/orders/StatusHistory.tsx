import React, { useState } from 'react'
import { IOrderStatusHistory } from '../../../types/profile/IOrderStatusHistory'
import { Button, Modal } from 'react-bootstrap'
import { formatDate } from '../../../helpers/functions'

type Props = {
    history: IOrderStatusHistory[]
}

const StatusHistory = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" className='ms-2' onClick={handleShow}>
                История статусов
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>История статусов</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Статус</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.history.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.status.name}</td>
                                    <td>{formatDate(item.date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default StatusHistory