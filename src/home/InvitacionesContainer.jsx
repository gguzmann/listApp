import React from 'react'
import { Invite } from './Invite'

export const InvitacionesContainer = ({invitaciones, cargarListas}) => {
  return (
    <div className="dropdown">
            <button type="button" className="btn btn-outline-secondary position-relative" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-regular fa-envelope"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {invitaciones.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              
              {
                invitaciones.length > 0 ?
                invitaciones.map((x,i) => <Invite key={i} invitacion={x} index={i} cargarListas={cargarListas} />)
                :
                <p className='dropdown-item px-3'>No tienes invitaciones</p>
              }
              
            </ul>
          </div>
  )
}
