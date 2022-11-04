import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { db } from '../firebase'

export const Invite = ({ invitacion, index }) => {

    const { user } = useAuth()
    const {setSend, send, setListas} = useStore()

    const aceptInvitacion = async () => {

        setListas([])
        const refDoc = await doc(db, "listas", invitacion.list)
        await updateDoc(refDoc, {
            users: arrayUnion(user.email)
        })
        await deleteDoc(doc(db, "invitaciones", invitacion.id))
        setSend(!send)
        // cargarListas()

    }


    return (
        <div className='dropdown-item  p-3'>
            <li key={index} >{invitacion.from} te invito a participar en la lista: {invitacion.name}</li>
            <div className="d-flex justify-content-center gap-1">
                <button className='btn btn-danger'>Ignorar</button>
                <button onClick={aceptInvitacion} className='btn btn-primary'>Aceptar</button>
            </div>
        </div>
    )
}
