import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MenuList = ({ item }) => {

    const navigate = useNavigate()

    // console.log(item)
    return (
        <button onClick={() => navigate('/list/' + item.uid, {state: {item}})} type="button" className="list-group-item list-group-item-action d-flex justify-content-between">
            <span>{item.name}</span>
            <div className='d-flex align-items-center gap-3'>
                <i className="fa-regular fa-envelope"></i>
                <span className="badge bg-primary rounded-pill">{item.items.length} </span>
            </div>
        </button>
    )
}
