import React, { useState } from 'react'

let nameList = {
    name: ''
}

export const NewListInput = ({ handleCreateList }) => {
    const [name, setName] = useState(nameList)



    const handleChange = e => {
        let newName = {
            [e.target.name]: e.target.value
        }
        setName(newName)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateList(name.newList)
        setName('')
    }
    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 justify-content-center">
            <input onChange={handleChange} type="text" name="newList" id="newList" className="form-control w-25" placeholder='Ingrese nueva lista'/>
            <input type="submit" className='btn btn-primary' value="Nueva Lista" />
        </form>
    )
}
