import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <Link to="/admin/signin"  className='btn-primary'>ADMIN</Link>
        <Link to="/superadmin/signin" className='btn-primary'>Super Admin</Link>
    </div>
  )
}

export default LandingPage