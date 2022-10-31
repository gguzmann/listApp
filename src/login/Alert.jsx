import React from 'react'

export const Alert = ({error}) => {
  return (
    <p className='alert alert-danger'>{error}</p>
  )
}
