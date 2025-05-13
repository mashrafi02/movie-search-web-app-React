import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div>404 Not Found <button onClick={() => navigate('/')}>Return Home</button></div>
  )
}

export default NotFound