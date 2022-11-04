import React from 'react'

export const NewItemInput = ({ addItem, newItem, setNewItem, loading }) => {
    return (
        <form onSubmit={addItem} className="d-flex gap-2">
            <input onChange={(e) => setNewItem({ value: e.target.value })} className="form-control" type="text" value={newItem.value} placeholder="Ingrese nuevo item a su lista..." />
            {
                loading ?
                    <button className="btn btn-primary d-flex align-items-center" type="button" disabled>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Agregando...
                    </button>
                    :
                    <button className='btn btn-primary'>Agregar</button>
            }
        </form>
    )
}
