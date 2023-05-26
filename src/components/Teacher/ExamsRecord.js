import React, { useState } from 'react'
import TeacherNav from './TeacherNav'
import { useLocation, useNavigate } from 'react-router'
import TeachersLayout from '../layouts/TeachersLayout'
import ExamLayout from '../layouts/ExamLayout'

const ExamsRecord = (props) => {
  const [collect, setCollect] = useState([])
  // let navigate = useNavigate()
  let display = JSON.parse(localStorage.getItem("pap"))
  let paphe = []

  const stt = (item) => {

    paphe.push(item)
    setCollect(paphe)
  }

  if(paphe == ""){
    
  }
  return (
    <ExamLayout stt={stt}>
        <div id='shop' className='w-100'>
            {
              collect.map((item, index) => (
                <div>
                    {item.name}
                </div>
            ))
            }
            {/* {
                <div className='shadow w-50 mx-auto my-24 p-4'>
                <h5>PLEASE PICK A STUDENT FROM LIST...</h5>
              </div>
            } */}
        </div>
    </ExamLayout>
  )
}

export default ExamsRecord