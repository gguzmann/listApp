import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export const Home = () => {
  const { user, logout } = useAuth()
  if(!user) return <Navigate to="/login"/>

  console.log(user)
  const handleLogout = async e => {
      await logout()
  }
  return (
    <>
      <h1>Home</h1>
      <hr />
      <h3>Bienvenido {user.displayName || user.email}</h3>
      <button onClick={handleLogout}>Cerrar Sesion</button>
    </>
  )
}
