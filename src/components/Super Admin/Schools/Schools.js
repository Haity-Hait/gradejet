import React, { useEffect, useState } from 'react'
import MainLayouts from '../../../layouts/Super Admin Layouts/MainLayouts'
import axios from 'axios'
import "./schools.css"
import { BiFilter } from "react-icons/bi"
import { Link } from 'react-router-dom'
const Schools = () => {
    const [school, setSchool] = useState([])
    const [search, setSearch] = useState("")
    useEffect(() => {
        axios.get("https://gradejet-backend.onrender.com/get/school").then((res) => {
            let data = res.data.result
            setSchool(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    // const profile = (item) => {
    //     console.log(item);
    // }



    let filtered = school
        .filter((item) => {
            return search.toLowerCase() === ''
                ? item
                : item.schoolName.toLowerCase().includes(search) || item.schoolName.toUpperCase().includes(search) ||
                item.phone.toString().includes(search) ||
                item.Zip.toString().includes(search) ||
                item.city.toLowerCase().includes(search) || item.city.toUpperCase().includes(search) ||
                item.email.toLowerCase().includes(search) || item.email.toUpperCase().includes(search) ||
                item.country.toLowerCase().includes(search) || item.country.toUpperCase().includes(search) ||
                item.address.toLowerCase().includes(search) || item.address.toUpperCase().includes(search)
        }).map((item, index) =>
            <div key={index.toString()} className='flex items-center gap-4 sep'>
                <img className='ama' src={item.image} alt="" />
                <div className='lil pe-7'>
                    <h3>{item.schoolName}</h3>
                    <p>{item.email}</p>
                </div>
                <div className="pop">
                    <Link className='ser' to={`/superadmin/school/${item._id}`}>View Profile</Link>
                </div>
            </div>
        )




    return (
        <MainLayouts>
            <main className='cc jj px-5'>
                <div className="fola">
                    <div className='flex  items-center'>
                        <h3>Filter</h3>
                        <BiFilter className='nn' />
                    </div>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search Schools....' className="form-control" />
                </div>
                <div>
                    <div className='flex flex-wrap items-center justify-between'>
                        {school <= 0 ?
                                    <div className='kili'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
                            : filtered
                        }
                        {
                            school.length <= 0 || filtered.length <= 0 && <div className='nax'><p>School Not found 😪</p></div>
                        }
                    </div>
                </div>
            </main>
        </MainLayouts>
    )
}

export default Schools