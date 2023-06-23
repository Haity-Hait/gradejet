import React, { useState } from "react";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import VerifyToken from "../../VerifyToken";
import { LuSchool2 } from "react-icons/lu";
import { MdOutlineSubject } from "react-icons/md";
import { GrCheckmark } from "react-icons/gr";
import "./courses.css";
import { CheckIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import CoursesPage from "./CoursesPage";
const Courses = () => {
    const { verifyData, expired } = VerifyToken();
    const [courseName, setCourseName] = useState("");
    const [courseType, setCourseType] = useState("");
    const adminEmail = verifyData.email;
    let data = { courseName, courseType, adminEmail };
    const Submit = () => {
        axios.post("http://localhost:1516/courses", data).then((res) => {
            let pop = res.data.message
            alert(pop)
            console.log(pop);
        }).catch((err) => {
            let errorMsg = err.response.data.message
            alert(errorMsg)
            console.log(errorMsg);
        })
    }
    return (
        <MainAdminLay>
            <div>
                <div className="fex ml-5">
                    <MdOutlineSubject className="icon" />
                    <h3>Courses</h3>
                </div>

                <div className="ses">
                    <div className="pile">
                        <p className="detail">
                            Course Name <span>*</span>
                        </p>
                        <input
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                            placeholder="Course Name"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="pile">
                        <p className="detail">
                            Course Type <span>*</span>
                        </p>
                        <select
                            className="form-control"
                            onChange={(e) => setCourseType(e.target.value)}
                        >
                            <option></option>
                            <option value="core">Core</option>
                            <option value="optional">Optional</option>
                        </select>
                        <button onClick={Submit} className="btn-primary m-4 oo">
                            <CheckIcon className="bute" />
                            Create
                        </button>
                    </div>
                </div>
                <CoursesPage />
            </div>
        </MainAdminLay>
    );
};

export default Courses;
