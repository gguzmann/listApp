import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./authContext";

export const storeContext = createContext()

export const useStore = () => {
    const context = useContext(storeContext)

    return context
}

export function StoreProvider({ children }) {
    const [listas, setListas] = useState([])
    const [invitaciones, setInvitaciones] = useState([])
    const [send, setSend] = useState(false)


    const { user } = useAuth()

    // Cargar invitaciones
    const cargarInvitaciones = async () => {
        const collectionInv = collection(db, "invitaciones")
        const q = query(collectionInv, where("to", "==", user.email))
        const queryInv = await getDocs(q)
        const invitacionesList = []
        queryInv.forEach(x => {
            let obj = { ...x.data(), id: x.id }
            invitacionesList.push(obj)
        })
        // console.log(invitaciones.length)
        setInvitaciones(invitacionesList)
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

    }

    const eliminarLista = async (id) => {
        setSend(!send)
        await deleteDoc(doc(db, "listas", id))

    }

    return (
        <storeContext.Provider value={{ eliminarLista, invitaciones, cargarInvitaciones, listas, setListas, cargarListas, send, setSend }}>
            {children}
        </storeContext.Provider>
    )
}

// gguzman@forus.cl