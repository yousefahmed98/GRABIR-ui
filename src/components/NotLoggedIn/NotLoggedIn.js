import React from 'react'
import { Link } from 'react-router-dom'

export default function NotLoggedIn() {
  return (
      <div>
    <div className='container text-center'>
    <h1 className='text-danger pt-5'>You are not logged in ,<Link to="/login">Login here</Link></h1>
    <h1 className='text-danger'>If you dont have account, <Link to="/register">Register here</Link></h1>
  </div>
  </div>
  )
}
