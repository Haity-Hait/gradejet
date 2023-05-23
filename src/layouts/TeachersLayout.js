import React from 'react'
import TeacherNav from '../components/TeacherNav'
import ExamSidebar from '../components/ExamSidebar'

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