import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import { LuSchool2 } from "react-icons/lu";
import VerifyToken from "../../VerifyToken";

const GenerateTeachers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [initial, setInitial] = useState("");
  const [course, setCourse] = useState("");
  const [show, setShow] = useState(true);
  const image = "https://scict.edossier.app/admin/assets/img/man.png";
  let teacherId = Math.floor(Math.random() * (500 - 100) + 100);
  let password = Math.random().toString(36).slice(2);
  const { verifyData, expired } = VerifyToken()
  let schoolName = verifyData.schoolName;
  let schoolEmail = verifyData.email;
  let data = {
    name,
    email,
    dob,
    teacherId,
    password,
    initial,
    course,
    image,
    schoolEmail,
    schoolName
  };
  const add = async () => {
    axios.post("http://localhost:1516/generate/teacher", data).then((res) => {
      alert(res.data.message);

    }).catch((err) => {
      alert(err.response.data.message);
    })
    setDob('')
    setEmail('')
    setInitial('')
    setName('')
    setCourse('')
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
        <div className="w-50 mx-auto mt-5 p-3 shadow rounded">
          <div className="fex">
            <LuSchool2 className="icon" />
            <h3>Generate Teacher</h3>
          </div>
          <div className="mb-3">
            <p className="detail">
              Teacher's Initial <span>*</span>
            </p>
            <select
              required
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              class="form-control"
            >
              <option selected></option>
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="miss">Miss</option>
            </select>
          </div>
          <div className="mb-3">
            <p className="detail">
              Teacher's Name <span>*</span>
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
              Teacher's Email Address <span>*</span>
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              value={email}
              id="exampleInputEmail1"
              required
            />
          </div>
          <div className="mb-3">
          <p className="detail">
              Teacher's D.O.B. <span>*</span>
            </p>
            <input
              onChange={(e) => setDob(e.target.value)}
              type="date"
              className="form-control"
              value={dob}
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <p className="detail">
              Course to take <span>*</span>
            </p>
            <select
              onChange={(e) => setCourse(e.target.value)}
              class="form-control"
              value={course}
              aria-label="Default select example"
            >
              <option selected></option>
              <option value="ui/ux">UI / UX </option>
              <option value="software engineering">Software Engineering</option>
              <option value="machine learning">Machine Learning</option>
              <option value="data science">Data Science</option>
              <option value="graphic design">Graphic Design</option>
              <option value="robotics">Robotics</option>
            </select>
          </div>
          <button onClick={add} type="submit" className="btn btn-primary">
            Generate
          </button>
        </div>
      </div>
    </MainAdminLay>
  );
};

export default GenerateTeachers;
