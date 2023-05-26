import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SigninStudents = () => {
    let [saved, setSaved] = useState([])
    let [password, setPassword] = useState("")
    let [studentID, setstudentID] = useState("")
    useEffect(() => {
        axios.get("http://localhost:1529/studentinfo")
            .then((res) => {
                let data = res.data
                setSaved(data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    const sub = () => {
        let pool = saved.filter((el) => el.studentId == studentID)
        console.log(pool);
        if(pool == ""){
            alert("You do not have an account with us!!")
        }else{
            let damn = pool[0]
            if(password == damn.password){
                alert("Signin Successful");
            }else{
                alert("Incorrect Password")
            }
        }
        // if (damn.password == password) {
        //     console.log("Perfect");
        //     alert("Signin Successful")
        // } else {
        //     console.log("nope");
        //     alert("incorrect password")
        // }
    }
    return (
        <div>
            <div className="shadow w-50 mx-auto mt-5 rounded p-4">
                <h3>Student Signin</h3>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Student Id</label>
                    <input onChange={(e) => setstudentID(e.target.value)} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>

                <button onClick={sub} type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}

export default SigninStudents