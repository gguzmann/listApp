import { arrayUnion, collection, doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { ListItem } from './ListItem'
import { NewItemInput } from './NewItemInput'

export const List = () => {
    const { listId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { item } = location.state
    const [list, setList] = useState([])
    const [newItem, setNewItem] = useState({ value: '' })


    const addItem = async (e) => {
        e.preventDefault()
        const duplicate = list.some(x => x.name == newItem.value)
        if (duplicate) return false
        if (newItem == '') return false

        console.log('add item:', newItem.value)
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
        const updateList = list.filter((x,i) => {
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
    }, [])


    return (
        <div className="container p-5">
            <div className="d-flex justify-content-between">
                <h3>{item.name} </h3>
                <button className='btn btn-warning' onClick={() => navigate('/')}>Volver</button>
            </div>
            <hr />
            <div className="d-flex align-items-center gap-2 justify-content-between my-3">
                <NewItemInput addItem={addItem} setNewItem={setNewItem} newItem={newItem} />
                <div>
                    <i className="fa-solid fa-users" tabindex="0" data-bs-toggle="tooltip" title={item.users}></i>
                    <span>{item.users.length}</span>
                </div>
            </div>
            <ul className="list-group">
                {
                    list.map((x, i) => {
                        return <ListItem item={x} ind={i} clickButton={clickButton} key={i} deleteItem={deleteItem}/>
                    })
                }
            </ul>
        </div>
    )
}
