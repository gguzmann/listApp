import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { AuthProvider } from './context/authContext'

const App = () => {
    return (
        <div className=''>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default App