import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Alert } from './Alert'

export const Register = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState()

  const { signup } = useAuth()
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        setError('')
        const resp = await signup(user.email, user.password)
          navigate('/')
      console.log('error')
    }catch(error){
      console.log(error)
      setError(error.code)
    }
  }

  return (
    <>
    <div className='vh-100 row d-flex justify-content-center align-items-center'>
      <div className='col-5 card p-5'>

      <h1>Register</h1>
      <hr />
      {error && <Alert error={error}/>  }

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
        <button className='btn btn-primary' type='submit'>Registrar</button>
        <button onClick={() => navigate('/login')} className='btn text-secondary'>Ya tienes cuenta? Logeate</button>
      </div>
      </form>
          </div>
          </div>
    </>
  )
}
