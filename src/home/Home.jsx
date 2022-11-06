import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useStore } from "../context/storeContext";
import { db } from "../firebase";
import { Alert } from "../login/Alert";
import { InvitacionesContainer } from "./InvitacionesContainer";
import { MenuList } from "./MenuList";
import { NewListInput } from "./NewListInput";

export const Home = () => {

  const { user, logout } = useAuth()
  const { invitaciones, cargarInvitaciones, listas, cargarListas, send, setSend } = useStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // CARGAR LISTA
  useEffect(() => {
    console.log('render')
    cargarListas()
    cargarInvitaciones()
  }, [send])





  // CREAR NUEVA LISTA
  const handleCreateList = async (listName) => {
    const duplicate = listas.some(x => x.name == listName)
    if (listName == '') {
      setError('Debe ingresar el nombre de la lista.')
      return false
    }
    if (duplicate) {
      setError('Ya existe una lista con ese nombre.')
      return false
    }
    setError(null)
    setLoading(true)
    try {
      const collectionRef = collection(db, "listas")
      const docRef = doc(collectionRef)
      const createList = await setDoc(docRef, {
        uid: docRef.id,
        name: listName,
        items: [],
        users: [user.email],
        author: user.email
      });
      // console.log("Document written with ID: ", docRef.id);

      cargarListas()
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setLoading(false)
  }

  const handleLogout = async e => {
    await logout()
  }
  return (
    <div className="container p-5">
      <div className="d-flex justify-content-between">
        <h3>{user.displayName || user.email}</h3>
        <div className="d-flex gap-3 align-items-center">
          <InvitacionesContainer invitaciones={invitaciones}  />
          <button className="btn btn-danger" onClick={handleLogout}><span className="btn-close"></span></button>
        </div>
      </div>
      <hr />
      <NewListInput handleCreateList={handleCreateList} loading={loading} />
      {
        error &&
        <Alert error={error}/>
      }
      <div className="list-group mt-3">
        <h3>Listas</h3>
        <ul className="list-group">

          {
            listas.length < 1 ?
              (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) :
              listas.map((item, index) =>
                <MenuList key={index} item={item} />
              )
          }
        </ul>
      </div>
    </div>
  )
}
