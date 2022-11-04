import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './home/Home'
import { Login } from './login/Login'
import { Register } from './login/Register'
import { AuthProvider } from './context/authContext'
import { ProtectedRoute } from './login/ProtecterRoutes'
import { List } from './home/List'
import { StoreProvider } from './context/storeContext'

const App = () => {
    return (
        <div className=''>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute>
                            <StoreProvider>
                                <Home />
                            </StoreProvider>
                        </ProtectedRoute>
                    } />
                    <Route path='/list/:listId' element={
                        <ProtectedRoute>
                            <StoreProvider>
                                <List />
                            </StoreProvider>
                        </ProtectedRoute>
                    } />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default App