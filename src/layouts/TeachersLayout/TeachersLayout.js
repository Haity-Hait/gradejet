import React from 'react'
import TeacherNav from '../../components/Teacher/TeacherNav'

const TeachersLayout = ({children}) => {
  return (
    <div>
        <TeacherNav  />
        <div>
            {children}
        </div>
    </div>
  )
}

export default TeachersLayout