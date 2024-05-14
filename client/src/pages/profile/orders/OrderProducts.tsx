import React, { useState } from 'react'
import { IOrderProduct } from '../../../types/profile/IOrderProduct'
import { Button, Modal } from 'react-bootstrap'
import { formatNumberWithSpaces } from '../../../helpers/functions'
import APP_CONFIG from '../../../app.config'
import { Link } from 'react-router-dom'

type Props = {
    products: IOrderProduct[]
}

const OrderProducts = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Состав заказа
            </Button>

            <Modal size={'lg'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Состав заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Наименование</th>
                            <th scope="col">Количество</th>
                            <th scope="col" className="text-end">Цена</th>
                            <th scope="col" className="text-end">Сумма</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.products.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <Link to={'/catalog/product/'+product.product.id}>
                                    <div className='d-flex'>
                                        <img src={APP_CONFIG.API_URL + product.product.images[0]} style={{
                                            width:40,
                                            aspectRatio:'1 / 1',
                                            objectFit:'contain',
                                            marginRight:10,
                                            borderRadius:10
                                        }} alt="" />
                                        <div>
                                            <small>Артикул: {product.product.article}</small>
                                            <p className="mb-0">{product.product.name}</p>
                                        </div>
                                    </div>
                                    </Link>
                                </td>
                                <td>{product.amount}</td>
                                <td className="text-end">{formatNumberWithSpaces(product.salePrice)} <i className="fa-solid fa-tenge"></i></td>
                                <td className="text-end">{formatNumberWithSpaces(product.amount * product.salePrice)} <i className="fa-solid fa-tenge"></i></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderProducts