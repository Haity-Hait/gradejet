import React, { useState } from "react";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import { LuSchool2 } from "react-icons/lu";
import { Icon } from "@iconify/react";
import VerifyToken from "../../VerifyToken";
import axios from "axios";
const Courses = () => {
  const [courseType, setCourseType] = useState("")
  const [courseTime, setCourseTime] = useState("")
  const [courseName, setCourseName] = useState("")
  const { verifyData, expired } = VerifyToken()
  let schoolName = verifyData.schoolName
  const data = {
    courseName,
    courseTime,
    courseType,
    schoolName
  }
  const create = () => {
    axios.post("http://localhost:1516/courses", data).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <MainAdminLay>
      <div className="px-5 py-2">
        <div className="fex">
          <Icon className="icon" icon="carbon:course" hFlip={true} />
          <h3>Create a Course</h3>
        </div>
        <div className="pile">
          <p className="detail">
            Course Name <span>*</span>
          </p>
          <input onChange={(e) => setCourseName(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="plex">
          <div className="pile">
            <p className="detail">
              Course Type <span>*</span>
            </p>
            <select className="form-control" onChange={(e) => setCourseType(e.target.value)}>
              <option></option>
              <option value="core">Core</option>
              <option value="optional">Optional</option>
            </select>
          </div>
          <div className="pile">
            <p className="detail">
              Course Time <span>*</span>
            </p>
            <input onChange={(e) => setCourseTime(e.target.value)} type="time" className="form-control" />
          </div>
        </div>
        <button onClick={create} className="btn-primary m-3">Create</button>
      </div>

    </MainAdminLay>
  );
};

export default Courses;
