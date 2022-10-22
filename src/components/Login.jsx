import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Alert } from './Alert'

export const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState()

  const navigate = useNavigate()
  const { signin, loginGoogle } = useAuth()

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const resp = await signin(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.code)
    }

  }

  const handleGoogleLogin = async (e) => {
    try {
      await loginGoogle()
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
        <div className='vh-100 row d-flex justify-content-center align-items-center'>
      <div className='col-5 card p-5'>

        <h1>Login</h1>
        <hr />
        {error && <Alert error={error} />}

        <form className='mb-3' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} type="text" className='form-control' name="email" id="email" />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" className='form-control' name="password" id="password" />
          </div>
          <div className='d-flex justify-content-between'>
          <button className='btn btn-primary' type='submit'>Entrar</button>
          <button onClick={() => navigate('/register')} className='btn text-secondary'>No tienes cuenta? Registrate</button>
          </div>
        </form>
        <hr />
      <div className='d-flex justify-content-center'>
        <button className='btn btn-outline-danger' onClick={handleGoogleLogin}>Enter With Google</button>
      </div>
      </div>
      </div>
    </>
  )
}
