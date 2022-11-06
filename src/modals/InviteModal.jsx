import { Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/authContext';
import emailjs from 'emailjs-com';
import { AlertSuccess } from '../login/Alert';

export const InviteModal = ({ setShow, show, item }) => {
    const handleClose = () => { setShow(false); setAlert(false) }

    const [message, setMessage] = useState({ to: '' })
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (message.to == '') return false
        setAlert(false)
        setLoading(true)
        const collectionRef = collection(db, "invitaciones")
        const docRef = doc(collectionRef)
        await setDoc(docRef, {
            to: message.to,
            list: item.uid,
            from: user.email,
            name: item.name
        });


        emailjs.send("service_owifnnb", "template_l8veqwn", {
            to: message.to,
            from: user.email,
            name: item.name
        }, import.meta.env.VITE_MAILKEY)
            .then(resp => {
                // console.log(resp)
                setMessage({ to: '' })
                setLoading(false)
                setAlert(true)

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
                    Invita a alguien a participar en esta lista
                    <input type="email" name="email" id="emailMessage" onChange={(e) => setMessage({ to: e.target.value })} className='form-control mt-2' placeholder='email@example.com' value={message.to} />
                    {alert && <AlertSuccess error={"Invitacion enviada exitosamente"} />}
                    <div className='d-flex gap-2 justify-content-end mt-3'>
                        {
                            !loading
                                ?
                                <input className='btn btn-primary' type="submit" value="Invitar" />
                                :
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Enviando...
                                </button>
                        }
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
