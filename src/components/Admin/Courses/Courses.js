import React, { useState } from "react";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import { LuSchool2 } from "react-icons/lu";
import { Icon } from "@iconify/react";
import VerifyToken from "../../VerifyToken";
import axios from "axios";
import "./courses.css";
import ShowCourses from "./ShowCourses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Courses = () => {
  const [courseType, setCourseType] = useState("");
  const [courseTimePerDay, setCourseTimePerDay] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const { verifyData, expired } = VerifyToken();
  let schoolName = verifyData.schoolName;
  const data = {
    courseName,
    courseTimePerDay,
    courseType,
    courseDuration,
    schoolName,
  };
  const create = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:1516/courses", data)
      .then((res) => {
        toast.success(res.data.message);
        setCourseName("")
        setCourseTimePerDay("")
        setCourseType("")
        setCourseDuration("")
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
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
            <input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="pile">
            <p className="detail">
              Course Type <span>*</span>
            </p>
            <select
              value={courseType}
              className="form-control"
              onChange={(e) => setCourseType(e.target.value)}
            >
              <option></option>
              <option value="core">Core</option>
              <option value="optional">Optional</option>
            </select>
          </div>
          <div className="plex">
            <div className="pile">
              <p className="detail">
                Hours per day <span>*</span>
              </p>
              <select
                value={courseTimePerDay}
                onChange={(e) => setCourseTimePerDay(e.target.value)}
                className="form-control"
              >
                <option></option>
                <option value="1hr">1hr</option>
                <option value="2hr">2hrs</option>
                <option value="3hrs">3hrs</option>
                <option value="4hrs">4hrs</option>
                <option value="5hrs">5hrs</option>
                <option value="6hrs">6hrs</option>
                <option value="7hrs">7hrs</option>
                <option value="8hrs">8hrs</option>
                <option value="9hrs">9hrs</option>
                <option value="10hrs">10hrs</option>
                <option value="11hrs">11hrs</option>
                <option value="12hrs">12hrs</option>
                <option value="13hrs">13hrs</option>
                <option value="14hrs">14hrs</option>
                <option value="15hrs">15hrs</option>
                <option value="16hrs">16hrs</option>
                <option value="17hrs">17hrs</option>
                <option value="18hrs">18hrs</option>
                <option value="19hrs">19hrs</option>
                <option value="20hrs">20hrs</option>
                <option value="21hrs">21hrs</option>
                <option value="22hrs">22hrs</option>
                <option value="23hrs">23hrs</option>
                <option value="24hrs">24hrs</option>
              </select>
            </div>
            <div className="pile">
              <p className="detail">
                Course Duration <span>*</span>
              </p>

              <div className="mamo">
                <span className="desar">Years</span>
                <input
                  value={courseDuration}
                  placeholder="(In Years)"
                  onChange={(e) => setCourseDuration(e.target.value)}
                  type="number"
                  className="form-control opy"
                />
              </div>
            </div>
          </div>
          <button onClick={(e) => create(e)} className="btn-primary m-3">
            Create Course
          </button>
          <ToastContainer />

          <ShowCourses />
        </div>
    </MainAdminLay>
  );
};

export default Courses;
