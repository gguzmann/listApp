import React from 'react'

export const ListItem = ({ item, ind, clickButton, deleteItem }) => {

    return (
        <div className='list-group-item d-flex justify-content-between' >

            <span className={!item.active ? ' text-decoration-line-through' : ''}  onClick={() => clickButton(ind)} role="button">
                {item.name}
            </span>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => deleteItem(ind)}></button>
        </div>
    )
}