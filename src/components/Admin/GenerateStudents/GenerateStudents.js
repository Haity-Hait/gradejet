import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import { LuSchool2 } from "react-icons/lu";
import VerifyToken from "../../VerifyToken";

const GenerateStudents = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setgender] = useState("");
    const [stateOfOrigin, setStateOfOrigin] = useState("");
    const [show, setShow] = useState(true);
    const image = "https://scict.edossier.app/admin/assets/img/man.png";
    let studentId = Math.floor(Math.random() * (100000 - 10000) + 100);
    let password = Math.random().toString(36).slice(2);
    const { verifyData, expired } = VerifyToken()
    let schoolName = verifyData.schoolName;
    let schoolEmail = verifyData.email;
    const courses = []
    const payments = []
    const documents = []
    let currentYear = new Date().getFullYear()
    let academicYear = String(currentYear) + " / " + String(currentYear - 1)
    const schoolLink = verifyData.schoolLink
    let data = {
        name,
        email,
        dob,
        studentId,
        password,
        gender,
        image,
        schoolEmail,
        schoolName,
        courses,
        payments,
        documents,
        stateOfOrigin,
        schoolLink,
        academicYear
    };
    const add = async () => {
        axios.post("http://localhost:1516/generate/student", data).then((res) => {
            alert(res.data.message);
        }).catch((err) => {
            alert(err.response.data.message);
        })
        setName(' ')
        setDob(' ')
        setEmail(' ')
        setStateOfOrigin(' ')
        setgender(' ')
    };

    return (
        <MainAdminLay>
            <div>
                {/* {show ? (
          <Alert onClose={() => setShow(false)} dismissible>
            Email Sent Succesfully
          </Alert>
        ) : (
          ""
        )} */}
                <div className=" px-5 py-2 ">
                    <div className="fex">
                        <LuSchool2 className="icon" />
                        <h3>Generate Student</h3>
                    </div>
                    <div className="mb-3">
                        <p className="detail">
                            Student's Gender <span>*</span>
                        </p>
                        <select
                            required
                            onChange={(e) => setgender(e.target.value)}
                            value={gender}
                            class="form-control"
                        >
                            <option selected></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <p className="detail">
                            Student's Full Name <span>*</span>
                        </p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            value={name}
                            className="form-control"
                            id="exampleInputEmail1"
                        />
                    </div>
                    <div className="mb-3">
                        <p className="detail">
                            Student's Email Address <span>*</span>
                        </p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            className="form-control"
                            id="exampleInputEmail1"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <p className="detail">
                            Student's D.O.B. <span>*</span>
                        </p>
                        <input
                            onChange={(e) => setDob(e.target.value)}
                            type="date"
                            value={dob}
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="mb-3">
                        <p className="detail">
                            Student's State Of Origin <span>*</span>
                        </p>
                        <input
                            onChange={(e) => setStateOfOrigin(e.target.value)}
                            type="text"
                            className="form-control"
                            value={stateOfOrigin}
                            id="exampleInputPassword1"
                        />
                    </div>


                    <button onClick={add} type="submit" className="mt-5 btn-primary">
                        Generate
                    </button>
                </div>
            </div>
        </MainAdminLay>
    );
};

export default GenerateStudents;
