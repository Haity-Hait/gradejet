import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ExamSidebar = () => {
  let [big, setBig] = useState([])
  let [search, setSearch] = useState("")
  let [count, setCount] = useState("")
  useEffect(() => {
    axios.get("http://localhost:1529/studentinfo")
      .then((res) => {
        let data = res.data
        setBig(data)
        setCount(data.length)
        console.log(big);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  const check = (item) => {
    console.log(item);
  }

  let filtered = big
    .filter((item) => {
      return search.toLowerCase() === ''
        ? item
        : item.name.toLowerCase().includes(search) || item.name.toUpperCase().includes(search) ||
        item.studentId.toString().includes(search) ||
        item.email.toLowerCase().includes(search) || item.email.toUpperCase().includes(search) ||
        item.dob.toLowerCase().includes(search) || item.dob.toUpperCase().includes(search)
    }).map((item, index) =>
      <div key={index.toString()} className='d-flex gog text-white align-items-center px-3 py-2 shadow'>
        <div>
          <img className='yup' src={item.image} alt="" />
        </div>
        <div className='mx-4'>
          <p className='fw-bold'>{item.name}</p>
          <p className='elon'>Student ID: {item.studentId}</p>
        </div>
      </div>
    )

  return (
    <div>
      <div className="side ">
        <div className="w-100 d-flex p-2 sticky-top justify-between bg-white shadow">
          <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control shadow-sm" />
          <button className='btn bg-white fw-bold shadow-sm'>{count}</button>
        </div>

        <div className='text-white'>
              
          {filtered ? filtered : 
            big.map((item, index) => (
              <div key={index.toString()} className='d-flex gog text-white align-items-center px-3 py-2 shadow'>
                <div>
                  <img className='yup' src={item.image} alt="" />
                </div>
                <div className='mx-4'>
                  <p className='fw-bold'>{item.name}</p>
                  <p className='elon'>Student ID: {item.studentId}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExamSidebar