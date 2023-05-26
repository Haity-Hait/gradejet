import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const SigninTeacher = () => {
    const navigate = useNavigate()
    let [saved, setSaved] = useState([])
    let [password, setPassword] = useState("")
    let [teacherID, setteacherID] = useState("")
    useEffect(() => {
        axios.get("http://localhost:1529/teacherinfo")
            .then((res) => {
                let data = res.data
                setSaved(data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    const sub = () => {
        let pool = saved.filter((el) => el.teacherId == teacherID)
        if(pool == ""){
            alert("You do not have an account with us!!")
        }else{
            let damn = pool[0]
            if(password == damn.password){
                console.log(damn);
                let set = damn
                localStorage.setItem("pap", JSON.stringify(set))
                navigate("/teacher/dashboard")
                alert("Signin Successful");
            }else{
                alert("Incorrect Password")
            }
        }
    }
    return (
        <div>
            <div className="shadow w-50 mx-auto mt-5 rounded p-4">
                <h3>Teacher Signin</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Teacher Id</label>
                    <input onChange={(e) => setteacherID(e.target.value)} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button onClick={sub} type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}

export default SigninTeacher