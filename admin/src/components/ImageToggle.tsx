import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

type Props = {
    title: string
    src: string
    style?: React.CSSProperties
    className?: string
}

const ImageToggle = (props: Props) => {

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <img
                src={process.env.REACT_APP_API_URL + props.src}
                alt={props.title}
                style={props.style ?? {}}
                className={'cursor-pointer ' + props.className ?? ''}
                onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>

                <Modal.Body>
                    <img src={process.env.REACT_APP_API_URL + props.src} alt={props.title}
                        style={{ width: '100%' }}
                    />
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ImageToggle