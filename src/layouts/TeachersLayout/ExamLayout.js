import React from 'react'
import TeacherNav from '../../components/Teacher/TeacherNav'
import ExamSidebar from '../../components/Teacher/ExamSidebar'

const ExamLayout = ({ children, stt }) => {
  
  return (
    <div>
      <TeacherNav />
      <div className="d-flex">
        <ExamSidebar stt={stt} />
        <div className='w-100'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ExamLayout