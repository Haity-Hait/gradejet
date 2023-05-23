import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router';



const GenerateTeacher = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [initial, setInitial] = useState("")
    const [level, setLevel] = useState("")
    const [branch, setBranch] = useState("")
    const [department, setDepartment] = useState("")
    const [show, setShow] = useState(false);
    const image = "https://scict.edossier.app/admin/assets/img/man.png"
    let teacherId = Math.floor(Math.random() * (500 - 100) + 100)
    let password = Math.random().toString(36).slice(2);
    let data = { name, email, dob, teacherId, password, initial, level, branch, department, image }

    const navigate = useNavigate()
    const add = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:1529/teacherinfo", data)
            .then((res) => {
                console.log(res);
                alert(res.data.name + " Teacher Account " + res.statusText)

            }).catch((err) => {
                console.log(err);
            })

        axios.post("http://localhost:1516/teacher/register", data)
            .then((res) => {
                console.log(res);
                // alert(res.data.name +" Student Account " + res.statusText )
            }).catch((err) => {
                console.log(err);
            })

        const res = await fetch("http://localhost:1516/teacher/register", {
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
            navigate("/teacher/signin", {replace: true})

        }

    }
    
    return (
        <div>
            {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Email Sent Succesfully
                </Alert> : ""
            }
            <div className="w-50 mx-auto mt-5 p-3 shadow rounded">
                <h3>Generate Teacher Password and ID</h3>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Choose a pronoun for the teacher</label>
                    <select onChange={(e) => setInitial(e.target.value)} class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="mr" >Mr</option>
                        <option value="mrs">Mrs</option>
                        <option value="miss">Miss</option>
                        <option value="dr">Dr.</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Teacher Full Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Teacher Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Teacher D.O.B.</label>
                    <input onChange={(e) => setDob(e.target.value)} type="date" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Teacher Level</label>
                    <select onChange={(e) => setLevel(e.target.value)} class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="intern" >Intern</option>
                        <option value="full staff">Full Staff</option>
                        <option value="branch manager">Branch Manager</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Branch</label>
                    <select onChange={(e) => setBranch(e.target.value)} class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="Dugbe" >Dugbe</option>
                        <option value="Ogbomosho">Ogbomosho</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Togo">Togo</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Iwo Road">Iwo Road</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Department</label>
                    <select onChange={(e) => setDepartment(e.target.value)} class="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="ui/ux" >UI / UX </option>
                        <option value="software engineering">Software Engineering</option>
                        <option value="machine learning">Machine Learning</option>
                        <option value="data science">Data Science</option>
                        <option value="graphic design">Graphic Design</option>
                        <option value="robotics">Robotics</option>
                    </select>
                </div>
                <button onClick={add} type="submit" className="btn btn-primary">Generate</button>
            </div>
        </div>
    )
}

export default GenerateTeacher