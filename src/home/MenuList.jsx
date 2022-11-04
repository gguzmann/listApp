import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteModal } from '../modals/InviteModal';
import { useAuth } from '../context/authContext';
import { useStore } from '../context/storeContext';

export const MenuList = ({ item }) => {
    const [show, setShow] = useState(false);
    const {user} = useAuth()
    const {eliminarLista} = useStore()
    const handleShow = () => setShow(true);
    const navigate = useNavigate()



    // console.log(item)
    return (
        <div className="list-group-item list-group-item-action d-flex justify-content-between">
            <span onClick={() => navigate('/list/' + item.uid, { state: { item } })} className="w-100" type="button">{item.name}</span>
            <div className='d-flex align-items-center gap-3'>
                
                <span className='d-flex align-items-center'><i className="fa-solid fa-users" tabIndex="0" data-bs-toggle="tooltip" title={item.users}></i> {item.users.length}</span>
                <button className='btn btn-secondary' onClick={handleShow}>
                    <i className="fa-regular fa-envelope"></i>
                </button>
                <span className="badge bg-primary rounded-pill">{item.items.length} </span>
                {
                    user.email == item.author &&
                    <button className='btn-close' onClick={() => eliminarLista(item.uid)}></button>
                }
            </div>

            <InviteModal setShow={setShow} show={show} item={item} />
        </div>
    )
}
