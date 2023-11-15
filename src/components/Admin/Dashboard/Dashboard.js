import React, { useContext, useEffect, useState } from "react";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import "./dashboard.css";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { LuSchool } from "react-icons/lu";
import { PiBooksDuotone, PiStudentDuotone } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";
// import { UilBooks } from '@iconscout/react-unicons/icons'
import Accordion from "../../../Accordion";
import Time from "../../Time";
import VerifyToken from "../../VerifyToken";
const DashboardAdmin = ({ Content }) => {
  const [data, setData] = useState([]);
  const [notice, setNotice] = useState([]);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState();
  const { verifyData, expired, teachers, students, courses } = VerifyToken()
  
    const showStudents = () => {
      navigate("/admin/display-student");
    }
    const showCourses = () => {
      navigate("/admin/display-course");
    }
    const showTeachers = () => {
      navigate("/admin/display-teacher");
    }
  setInterval(useEffect(() => {
    let time = new Date().toLocaleTimeString();
    if (time >= "0:00:00 AM") {
      setCurrentTime("Good morning");
    }
    if (time >= "12:00:00 PM") {
      setCurrentTime("Good Afternoon");
    }
    if (time >= "4:00:00 PM") {
      setCurrentTime("Good Evening");
    }
  }), 0);

  useEffect(() => {
    axios
      .get("http://localhost:1516/get/admin/notice")
      .then((res) => {
        // console.log();
        let note = res.data.notice;
        setNotice(note);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <MainAdminLay>
        <div className="joj">
          <div className="waist px-3">
            <h3 className="bop">DASHBOARD</h3>
            <div className="e">
            <Time STYLE="meo" />

            </div>
          </div>
          <div className="yur">
            <div className="flex lin items-center justify-between">
              <div className="sch flip" onClick={showStudents}>
                <PiStudentDuotone className="nan" />
                <p className=" mx-4">Total Students</p>
                <p className="ppaa ">{students.length }</p>
              </div>
              <div className="sch flip" onClick={showTeachers}>
                <FaChalkboardTeacher className="nan" />
                <p className=" mx-4">Total teachers</p>
                <p className="ppaa ">{teachers.length}</p>
              </div>
              <div className="sch flip" onClick={showCourses}>
                <PiBooksDuotone className="nan" />
                <p className=" mx-4">Total Courses</p>
                <p className="ppaa ">{courses.length }</p>
              </div>
            </div>

            <div className="flex fall justify-between items-center">
              <div>
                <h1 className="mn">{currentTime},  {verifyData.schoolName} Admin.</h1>
              </div>
              <div className="blue p-3">
                <h1 className="wel ">Welcome Back To GradeJet</h1>
              </div>
            </div>
            <div className=" mt-7">
              <div className="notice kiss">
                <div className="nes">
                  <p>Notice</p>
                  <MegaphoneIcon className=" w-5" />
                </div>
                {notice.map((item, key) => (
                  <Accordion datas={item} key={key} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainAdminLay>
    </div>
  );
};

export default DashboardAdmin;
