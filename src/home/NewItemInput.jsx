import React from 'react'

export const NewItemInput = ({addItem, newItem, setNewItem}) => {
    return (
        <form onSubmit={addItem} className="d-flex gap-2">
            <input onChange={(e) => setNewItem({ value: e.target.value })} className="form-control" type="text" value={newItem.value} />
            <button className='btn btn-primary'>Add</button>
        </form>
    )
}
