import React from 'react'
import StudentSidebar from '../Sidebar/Sidebar'
import StudentLayout from '../../../layouts/StudentLayout/Layout'
import Time from '../../Time'
import { PiBooksDuotone, PiStudentDuotone } from 'react-icons/pi'
import { FaChalkboardTeacher } from 'react-icons/fa'

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <div className="text">
        <div className='flex justify-between items-center'>
          <h1>Dashboard</h1>
          <Time />
        </div>
        <div className="flex lin items-center justify-between">
          <div className="sch flip" >
            <PiStudentDuotone className="nan" />
            <p className=" mx-4">Total Students</p>
            <p className="ppaa ">0</p>
          </div>
          <div className="sch flip" >
            <FaChalkboardTeacher className="nan" />
            <p className=" mx-4">Total teachers</p>
            <p className="ppaa ">0</p>
          </div>
          <div className="sch flip" >
            <PiBooksDuotone className="nan" />
            <p className=" mx-4">Courses</p>
            <p className="ppaa ">0</p>
          </div>
        </div>


      </div>
    </StudentLayout>
  )
}

export default StudentDashboard