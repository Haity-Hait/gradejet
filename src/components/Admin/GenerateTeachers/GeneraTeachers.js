import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import { LuSchool2 } from "react-icons/lu";
import VerifyToken from "../../VerifyToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Time from "../../Time";
const GenerateTeachers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [initial, setInitial] = useState("");
  const [course, setCourse] = useState("");
  const [show, setShow] = useState(true);
  const [getCourses, setGetCourses] = useState([]);
  const image = "https://scict.edossier.app/admin/assets/img/man.png";
  let teacherId = Math.floor(Math.random() * (500 - 100) + 100);
  let password = Math.random().toString(36).slice(2);
  const { verifyData, courses } = VerifyToken();
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
    schoolName,
  };
  const add = async () => {
    axios
      .post("https://gradejet-backend.onrender.com/generate/teacher", data)
      .then((res) => {
        toast.success(res.data.message);
        setDob("");
        setEmail("");
        setInitial("");
        setName("");
        setCourse("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <MainAdminLay>
      <div>
        <ToastContainer />
        <div className="w-50 mx-auto p-3 shadow rounded">
        <div className="waist px-3">
          <h3 className="bop">Teachers</h3>
          <div className="e">
            <Time STYLE="meo" />
          </div>
        </div>
          <div className="mb-3">
            <p className="detail">
              Teacher's Initial <span>*</span>
            </p>
            <select
              required
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              className="form-control"
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
              className="form-control"
              value={course}
            >
              <option value="" disabled selected hidden>
                Select a course....
              </option>
              {course.length == 0 ? (
                courses.map((el, index) => (
                  <>
                    <option value={el.courseName}>{el.courseName}</option>
                  </>
                ))
              ) : (
                <option disabled>
                  No course has been registered in the school
                </option>
              )}
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
