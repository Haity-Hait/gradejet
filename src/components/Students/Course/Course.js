import React, { useState, useEffect } from 'react';
import StudentLayout from '../../../layouts/StudentLayout/Layout';
import "./course.css";
import VerifyStudToken from '../VerifyToken';
import axios from 'axios';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router';

const StudentCourse = () => {
  const { verifyData } = VerifyStudToken();
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const choose = (item) => {
    const isSelected = selected.some((selectedItem) => selectedItem._id === item._id);
    if (isSelected) {
      setSelected((prevSelected) => prevSelected.filter((selectedItem) => selectedItem._id !== item._id));
    } else {
      setSelected((prevSelected) => [...prevSelected, item]);
    }
  }

  const data = {
    name: verifyData.name,
    email: verifyData.email,
    schoolEmail: verifyData.schoolEmail,
    array: selected
  };

  const save = () => {
    axios.post("https://gradejet-backend.onrender.com/selectedCourse", data)
      .then((res) => {
        console.log(res);
        toast.success("Request successful");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert(err.response.data)
        navigate("/student/mycourse");
      });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response2 = await axios.get("https://gradejet-backend.onrender.com/get/courses", {
          params: {
            schoolName: verifyData.schoolName,
          },
        });
        setCourses(response2.data.message);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [verifyData.schoolName]);

  return (
    <StudentLayout>
      <ToastContainer />
      <div className='text'>
        <div className='head'>
          <h2 className='fic'>Pick Your Courses</h2>
          <h3 className='uu'>All {verifyData.schoolName} Course</h3>
        </div>

        <div className='cae'>
          {courses.length > 0 ? courses.map((item, index) => (
            <button onClick={() => choose(item)}
              className={`course ${selected.some((selectedItem) => selectedItem._id === item._id) ? 'selected-course' : ''}`}
            >
              {item.courseName} {selected.some((selectedItem) => selectedItem._id === item._id) ? <FaMinus /> : <FaPlus />}
            </button>
          )) : <i className='xx'>{verifyData.schoolName} educational institution has not yet developed any courses available for application.</i>}
        </div>

        <div>
          <button onClick={save} className='po'>Save</button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCourse;
