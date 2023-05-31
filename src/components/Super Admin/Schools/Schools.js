import React, { useEffect, useState } from 'react'
import MainLayouts from '../../../layouts/Super Admin Layouts/MainLayouts'
import axios from 'axios'
import "./schools.css"
const Schools = () => {
    const [school, setSchool] = useState([])
    useEffect(() => {
        axios.get("http://localhost:1516/get/school").then((res) => {
            let data = res.data.result
            setSchool(data)
        }).catch((err) => {
            console.log(err);
        })
    })
    const profile = (item) => {
        console.log(item);
    }
    return (
        <MainLayouts>
            <main className='cc px-5'>
                <input type="text" placeholder='Search Schools....' className="form-control" />

                <div>
                    <div className='flex flex-wrap items-center justify-between'>
                        {school.map((item, index) => (
                            <div key={index.toString()} className='flex items-center gap-4 sep'>
                                <img className='ama' src={item.image} alt="" />
                                <div className='lil pe-7'>
                                    <h3>{item.schoolName}</h3>
                                    <p>{item.email}</p>
                                </div>
                                <div className="pop">
                                    <button onClick={() => profile(item)}>View Profile</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </MainLayouts>
    )
}

export default Schools