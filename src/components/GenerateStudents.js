import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';



const GenerateStudents = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [show, setShow] = useState(false);

    let studentId = Math.floor(Math.random() * (100000 - 10000)+ 10000)
    let password =  Math.random().toString(36).slice(2);
    let data = {name, email, dob, studentId, password}


    const add = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:1529/studentinfo", data)
        .then((res) => {
            console.log(res);
            alert(res.data.name +" Student Account " + res.statusText )
        }).catch((err) => {
            console.log(err);
        })

        axios.post("http://localhost:1516/register", data)
        .then((res) => {
            console.log(res);
            // alert(res.data.name +" Student Account " + res.statusText )
        }).catch((err) => {
            console.log(err);
        })


        const res = await fetch("http://localhost:1516/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        });
        
        const datam = await res.json();
        console.log(datam);

        if (datam.status === 401 || !datam) {
            console.log("error")
        } else {
            setShow(true);
            setEmail("")
            console.log("Email sent")
        }
    }






    
    
    return (
        <div>
            {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Succesfully Send
                </Alert> : ""
            }
            <div className="w-50 mx-auto mt-5 p-3 shadow rounded">
                <h3>Generate student Password and ID</h3>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Student Full Name</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Student Email address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Student D.O.B.</label>
                        <input onChange={(e) => setDob(e.target.value)} type="date" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                    </div>
                    <button onClick={add} type="submit" className="btn btn-primary">Generate</button>
            </div>
        </div>
    )
}

export default GenerateStudents