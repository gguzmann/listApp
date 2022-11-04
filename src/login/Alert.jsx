import React from 'react'

export const Alert = ({error}) => {
  return (
    <p className='alert alert-danger text-center p-1'>{error}</p>
  )
}

export const AlertSuccess= ({error}) => {
  return (
    <p className="alert alert-success p-1 text-center mt-3"> {error}</p>
  )
}