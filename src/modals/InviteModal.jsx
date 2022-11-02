import { Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/authContext';
import emailjs from 'emailjs-com';

export const InviteModal = ({ setShow, show, idList }) => {
    const handleClose = () => setShow(false);

    const [send, setSend] = useState(false)
    const [message, setMessage] = useState({ to: '' })
    const { user } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (message.to == '') return false

        const collectionRef = collection(db, "invitaciones")
        const docRef = doc(collectionRef)
        const createList = await setDoc(docRef, {
            to: message.to,
            list: idList,
            from: user.email
        });

        
        emailjs.send("service_owifnnb", "template_l8veqwn", {
            from: message.to,
            to: user.email,
            list: idList,
        }, import.meta.env.VITE_MAILKEY)
            .then(resp => {
                console.log(resp)
                // setSend(true)
                setMessage({ to: '' })
            })
            .catch(err => console.log(err))
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Invitar</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={handleSubmit}>
                    Invita a un amigo a participar en esta lista
                    <input type="email" name="email" id="emailMessage" onChange={(e) =>  setMessage({ to: e.target.value })} className='form-control' placeholder='email@example.com' value={message.to} />
                    <div className='d-flex gap-2 justify-content-end mt-3'>
                        <button className='btn btn-secondary' onClick={handleClose}>Cancelar</button>
                        <input className='btn btn-primary' type="submit" value="Invitar" />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
