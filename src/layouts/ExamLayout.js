import React from 'react'
import TeacherNav from '../components/TeacherNav'
import ExamSidebar from '../components/ExamSidebar'

const ExamLayout = ({ children }) => {
  return (
    <div>
      <TeacherNav />
      <div className="d-flex">
        <ExamSidebar />
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ExamLayout