import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { db } from "../firebase";
import { MenuList } from "./MenuList";
import { NewListInput } from "./NewListInput";

export const Home = () => {

  const [listas, setListas] = useState([])

  const { user, logout } = useAuth([])
  // if (!user) return (<Navigate to="/login" />)

  // CARGAR LISTA
  useEffect(() => {
    console.log('render')
    cargarListas()
  }, [])

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
        <div className="d-flex gap-3">

          <button type="button" className="btn btn-outline-secondary position-relative">
            <i className="fa-regular fa-envelope"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesion</button>
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
