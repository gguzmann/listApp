import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase'

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    return context
}


export function AuthProvider({ children }) {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const signup = async (email, password) => {
         await createUserWithEmailAndPassword(auth, email, password)
    }

    const signin = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCredential)
    }

    const loginGoogle = async () => {
        const googleProvider =  await new GoogleAuthProvider()
        return  signInWithPopup(auth, googleProvider)
    }

    const logout = async () => await signOut(auth)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser)
        })
    }, [])
    

    return (
        <authContext.Provider value={{ signup, signin, user, logout, loginGoogle }}>
            {children}
        </authContext.Provider>
    )
}