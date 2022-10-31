import React, { useState } from 'react'

let nameList = {
    name: ''
}

export const NewListInput = ({ handleCreateList }) => {
    const [name, setName] = useState({nameList: ''})



    const handleChange = e => {
        setName({nameList: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateList(name.nameList)
        setName({nameList: ''})
    }
    return (
        <div className="d-flex align-items-center gap-2 justify-content-between my-3">

        <form onSubmit={handleSubmit} className="d-flex gap-2">
            <input onChange={handleChange} type="text" name="newList" id="newList" className="form-control" placeholder='Ingrese nueva lista' value={name.nameList}/>
            <input type="submit" className='btn btn-primary' value="Nueva Lista" />
        </form>
        </div>
    )
}
