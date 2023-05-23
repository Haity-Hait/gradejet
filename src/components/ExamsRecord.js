import React from 'react'
import TeacherNav from './TeacherNav'
import { useLocation, useNavigate } from 'react-router'
import TeachersLayout from '../layouts/TeachersLayout'
import ExamLayout from '../layouts/ExamLayout'

const ExamsRecord = () => {
  // let navigate = useNavigate()
  let display = JSON.parse(localStorage.getItem("pap"))
  
  return (
    <ExamLayout>
        <div>
          
        </div>
    </ExamLayout>
  )
}

export default ExamsRecord