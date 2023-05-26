import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import TeachersLayout from '../layouts/TeachersLayout'
import { UserIcon } from '@heroicons/react/24/solid'
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Todo from './TOdo/Todo'
const HomeTeach = () => {
  let display = JSON.parse(localStorage.getItem("pap"))

  console.log();
  return (
    <TeachersLayout>
      <div className='mt-3 container-fluid p-4'>
        <div>
          <h4 className='name'>Welcome, <b className='pab'>{display.initial} {display.name}</b></h4>
          <p className='pab fw-bold name'>GradeJet College of ICT</p>
        </div>

        <div className='und'>
          <p className='name '>Personal Dashboard</p>
        </div>

        <div className="d-flex  alone justify-content-between mt-4">
          <div className="each shadow border flex ">
            <UserIcon className='w-6' />
            &nbsp;
            &nbsp;
            &nbsp;
            <div>
              <p className='pab  '>{display.name}</p>
              <p className='pab name shift'>Staff ID: {display.teacherId}</p>
            </div>
          </div>


          <div className="each shadow border  ">
            <CalendarIcon className='w-6' />
            &nbsp;
            &nbsp;
            &nbsp;
            <div>
              <p className='pab  '>{display.level}</p>
              <p className='pab name shift'>Structure</p>
            </div>
          </div>


          <div className="each shadow border  ">
            <CalendarIcon className='w-6' />
            &nbsp;
            &nbsp;
            &nbsp;
            <div>
              <span className='pab  '>YY-MM-DD</span>
              <p className='pab  cd'>{display.dob}</p>
              <p className='pab name shift'>Date of birth</p>
            </div>
          </div>


          <div className="each shadow border  ">
            <MapPinIcon className='w-6' />
            &nbsp;
            &nbsp;
            &nbsp;
            <div>
              <p className='pab  cd'>{display.branch}</p>
              <p className='pab name shift'>Branch</p>
            </div>
          </div>

        </div>
        <div className="w-50 mt-5 shadow ">
        <Todo />
        </div>
      </div>
    </TeachersLayout>
  )
}

export default HomeTeach