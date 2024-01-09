import React from 'react'
import StudentSidebar from '../../components/Students/Sidebar/Sidebar'

const StudentLayout = ({children}) => {
  return (
    <div>
        <StudentSidebar pageContent={children} />
    </div>
  )
}

export default StudentLayout