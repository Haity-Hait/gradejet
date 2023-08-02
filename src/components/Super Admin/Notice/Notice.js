import React, { useState } from 'react'
import MainLayouts from '../../../layouts/Super Admin Layouts/MainLayouts'
import { LuSchool2 } from 'react-icons/lu'
import "./notice.css"
import axios from "axios"
const Notice = () => {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [notice, setNotice] = useState("")
    let date = new Date().toDateString()
    let time = new Date().toLocaleTimeString()
    const sender = "Gradejet Management"
    let data = { from, to, notice, date, time, sender }
    const send = () => {
        console.log(time);
        axios.post("http://localhost:1516/notice", data).then((res) => {
            alert(`Notice sent to all ${res.data.message.to}`);
        }).catch((err) => {
            alert(err.response.data.message);
        })
    }
    
    
    return (
        <MainLayouts>
            <div className=" px-5 py-2">
                <div className="flex foster justify-between">
                    <div className="fex">
                        <LuSchool2 className="icon" />
                        <h3>Notices</h3>
                    </div>
                    <div className="sete  flex items-center gap-5">
                        <div className="flex items-center gap-3">
                            <p>From:</p>
                            <select className='form-control' onChange={(e) => setFrom(e.target.value)}>
                                <option selected></option>
                                <option value="Gradejet Management">Super Admin</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <p>To:</p>
                            <select className='form-control' onChange={(e) => setTo(e.target.value)}>
                                <option selected></option>
                                <option value="admins">Admins</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <textarea onChange={(e) => setNotice(e.target.value)} className='bubo'></textarea>
                </div>
                <div className='loader'>
                    <button onClick={send}>Send</button>
                </div>
            </div>
        </MainLayouts>
    )
}

export default Notice