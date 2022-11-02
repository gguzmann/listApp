import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { db } from "../firebase";
import { InvitacionesContainer } from "./InvitacionesContainer";
import { MenuList } from "./MenuList";
import { NewListInput } from "./NewListInput";

export const Home = () => {

  const [listas, setListas] = useState([])
  const [invitaciones, setInvitaciones] = useState([])
  const { user, logout } = useAuth([])
  // if (!user) return (<Navigate to="/login" />)

  // CARGAR LISTA
  useEffect(() => {
    console.log('render')
    cargarListas()
    cargarInvitaciones()
  }, [])

  const cargarInvitaciones = async () => {
    const collectionInv = collection(db, "invitaciones")
    const q = query(collectionInv, where("to", "==", user.email))
    const queryInv = await getDocs(q)
    const invitacionesList = []
    queryInv.forEach(x => {
      let obj = {...x.data(), id: x.id}
      console.log(obj)
      console.log(x.id)
      invitacionesList.push(obj)
    })
    console.log(invitacionesList.length)
    setInvitaciones(invitacionesList)
    console.log(invitaciones)
  }

  // CARGAR LISTAS POR USUARIO
  const cargarListas = async () => {

    const collectListas = collection(db, "listas")
    const q = query(collectListas, where("users", "array-contains", user.email));

    const arr = []
    const queryListas = await getDocs(q);
    queryListas.forEach((doc) => {
      const obj = doc.data()
      arr.push(obj)
    });

    setListas(listas => arr)
    console.log(listas)

  }

  // CREAR NUEVA LISTA
  const handleCreateList = async (listName) => {
    if (listName == '') return false
    try {
      const collectionRef = collection(db, "listas")
      const docRef = doc(collectionRef)
      const createList = await setDoc(docRef, {
        uid: docRef.id,
        name: listName,
        items: [],
        users: [user.email]
      });
      console.log("Document written with ID: ", docRef.id);

      cargarListas()
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  const handleLogout = async e => {
    await logout()
  }
  return (
    <div className="container p-5">
      <div className="d-flex justify-content-between">
        <h3>{user.displayName || user.email}</h3>
        <div className="d-flex gap-3 align-items-center">
          <InvitacionesContainer invitaciones={invitaciones} cargarListas={cargarListas}/>
          <button className="btn btn-danger" onClick={handleLogout}><span class="btn-close"></span></button>
        </div>
      </div>
      <hr />
      <NewListInput handleCreateList={handleCreateList} />
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
