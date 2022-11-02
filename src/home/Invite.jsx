import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useAuth } from '../context/authContext'
import { db } from '../firebase'

export const Invite = ({ invitacion, index, cargarListas }) => {

    const { user } = useAuth()

    const aceptInvitacion = async () => {

        const refDoc = await doc(db, "listas", invitacion.list)
        await updateDoc(refDoc, {
            users: arrayUnion(user.email)
        })
        await deleteDoc(doc(db, "invitaciones", invitacion.id))
        cargarListas()
    }

    return (
        <div className='dropdown-item  p-3'>
            <li key={index} >{invitacion.from} te invito a participar en la lista: {invitacion.list}</li>
            <div className="d-flex justify-content-center gap-1">
                <button className='btn btn-danger'>Ignorar</button>
                <button onClick={aceptInvitacion} className='btn btn-primary'>Aceptar</button>
            </div>
            <hr />
        </div>
    )
}
