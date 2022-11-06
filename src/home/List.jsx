import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { Alert } from '../login/Alert'
import { ListItem } from './ListItem'
import { NewItemInput } from './NewItemInput'

export const List = () => {
    const { listId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { item } = location.state
    const [list, setList] = useState([])
    const [newItem, setNewItem] = useState({ value: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const addItem = async (e) => {
        e.preventDefault()
        const duplicate = list.some(x => x.name == newItem.value)

        if (newItem.value == '') {
            setError('Debe ingresar el nombre de la lista.')
            return false
        }
        if (duplicate) {
            setError('Ya existe una lista con ese nombre.')
            return false
        }
        setError(null)
        setLoading(true)
        // console.log('add item:', newItem.value)
        const docRef = doc(db, "listas", listId)

        let obj = {
            name: newItem.value,
            active: true
        }

        await updateDoc(docRef, {
            items: arrayUnion(obj)
        })

        setList(list => [...list, obj])

        setNewItem({ value: '' })
        setLoading(false)

    }

    const clickButton = async (itemList) => {

        const update = list.map((x, i) => {
            if (i == itemList) {
                return { ...x, active: !x.active }
            } else {
                return x
            }
        })
        setList(update)

        const docRef = doc(db, "listas", listId)
        await updateDoc(docRef, {
            items: update
        })


    }

    const deleteItem = async (indexItem) => {
        const updateList = list.filter((x, i) => {
            if (i != indexItem) {
                return x
            }
        })
        setList(updateList)

        const docRef = doc(db, "listas", listId)
        await updateDoc(docRef, {
            items: updateList
        })

    }

    useEffect(() => {
        setList(item.items)
        // list > 0 && setLoading(false)
    }, [])


    return (
        <div className="container p-5">
            <div className="d-flex justify-content-between">
                <h3>{item.name} </h3>
                <button className='btn btn-warning' onClick={() => navigate('/')}>Volver</button>
            </div>
            <hr />
            <div className="d-flex align-items-center gap-2 justify-content-between my-3">
                <NewItemInput addItem={addItem} setNewItem={setNewItem} newItem={newItem} loading={loading} />
                <div>
                    <i className="fa-solid fa-users" tabIndex="0" data-bs-toggle="tooltip" title={item.users}></i>
                    <span>{item.users.length}</span>
                </div>
                </div>
                {
                    error &&
                    <Alert error={error} />
                }
                <div>
            </div>
            <ul className="list-group">
                {
                    list.length > 0
                        ?
                        list.map((x, i) => {
                            return <ListItem item={x} ind={i} clickButton={clickButton} key={i} deleteItem={deleteItem} />
                        })
                        :
                        <Alert error={"No tienes item en esta lista"} />
                }
            </ul>
        </div>
    )
}
