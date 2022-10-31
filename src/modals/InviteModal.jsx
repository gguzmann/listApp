import { Modal, Button } from 'react-bootstrap'
import React from 'react'

export const InviteModal = ({ setShow, show }) => {
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('first')
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Invitar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    Woohoo, you're reading this text in a modal!
                    <input type="text" name="" id="" className='form-control' />
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Invitar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
