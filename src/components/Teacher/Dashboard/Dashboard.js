import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { PiBooksDuotone, PiStudentDuotone } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";
import Accordion from "../../../Accordion";
import Time from "../../Time";
import MainTeachLay from "../../../layouts/TeachersLayout/TeachLay";
import VerifyTeachToken from "../VerifyToken";
const DashboardAdmin = ({ Content }) => {
    const [data, setData] = useState([]);
    const [notice, setNotice] = useState([]);
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState();
    const { verifyData, expired, teachers, students, courses } = VerifyTeachToken()

    const showStudents = () => {
        navigate("");
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

    const senderEmail = verifyData.schoolEmail
    // const param = { senderEmail }
    console.log(senderEmail, "senderEmail");
    let datas = {senderEmail}

    const pepe = () => {
         axios
            .post(`https://gradejet-backend.onrender.com/get/teacher/notice`, datas)
            .then((res) => {
                console.log(res)
                let note = res.data.notice;
                setNotice(note);
                console.log(note);
            })
            .then((err) => {
                console.log(err);
            });
    }
       useEffect(() => {
        if(senderEmail){
            pepe()
           }else {
            return;
           }
       });
    return (
            <MainTeachLay>
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
                                <p className=" mx-4">Course Students</p>
                                <p className="ppaa ">{students.length}</p>
                            </div>
                            <div className="sch flip" >
                            <PiBooksDuotone className="nan" />

                                <p className=" mx-4">{verifyData.course}</p>
                                <p className="ppaa invisible"></p>
                            </div>
                            <div className="sch flip" >
                                <PiStudentDuotone className="nan" />
                                <p className=" mx-4">Staff ID</p>
                                <p className="ppaa p-7">{verifyData.teacherId}</p>
                            </div>
                            
                            
                            
                        </div>

                        <div className="flex fall justify-between items-center">
                            <div>
                                <h1 className="mn">{currentTime}, <span className=" capitalize">{verifyData.initial}</span>  {verifyData.name}.</h1>
                            </div>
                            <div className="blue p-3">
                                <h1 className="wel ">Welcome Back To GradeJet System</h1>
                            </div>
                        </div>
                        <div className="flexb mt-7  justify-evenly">
                            <div className="notice kiss">
                                <div className="nes">
                                    <p>Notice</p>
                                    <MegaphoneIcon className=" w-5" />
                                </div>
                                {notice.map((item, key) => (
                                    <Accordion datas={item} key={key} />
                                ))}
                            </div>
                            <div className=" tt  ">
                                <h1 className="mn me">
                                    Empowering educators to inspire minds and shape futures — because great teachers don't just educate, they ignite a passion for learning.
                                    <br />
                                    __{verifyData.schoolName}
                                </h1>


                            </div>
                        </div>

                    </div>
                </div>
            </MainTeachLay>
    );
};

export default DashboardAdmin;
