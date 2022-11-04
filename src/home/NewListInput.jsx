import React, { useState } from 'react'

let nameList = {
    name: ''
}

export const NewListInput = ({ handleCreateList, loading }) => {
    const [name, setName] = useState({ nameList: '' })



    const handleChange = e => {
        setName({ nameList: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateList(name.nameList)
        setName({ nameList: '' })
    }
    return (
        <div className="d-flex align-items-center gap-2 justify-content-center my-3">

            <form onSubmit={handleSubmit} className="d-flex gap-2">
                <input onChange={handleChange} type="text" name="newList" id="newList" className="form-control" placeholder='Ingrese nueva lista' value={name.nameList} />
                {
                    !loading ?
                        <input type="submit" className='btn btn-primary' value="Nueva Lista" />
                        :
                        <button className="btn btn-primary d-flex align-items-center" type="button" disabled>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Agregando...
                        </button>
                }
            </form>
        </div>
    )
}
