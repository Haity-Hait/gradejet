import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <Link to="/superadmin/signin" className='btn-primary'>Super Admin</Link>
        <Link to="/admin/signin"  className='btn-primary'>ADMIN</Link>
        <Link to="/teacher/auth" className='btn-primary'>Teacher</Link>
        <Link to="/student/auth" className='btn-primary'>Student</Link>
    </div>
  )
}

export default LandingPage