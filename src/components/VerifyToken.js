import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "./Admin/Modal/Modal";

const VerifyToken = () => {
  const [expired, setExpired] = useState(false);
  const [verifyData, setVerifyData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudent] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/admin/signin");
  };

  const checkTeacher = async () => {
    if (verifyData) {
      let schoolName = verifyData.schoolName;
      try {
        const response = await axios.get("http://localhost:1516/get/teachers", {
          params: {
            schoolName: schoolName,
          },
        });
        setTeachers(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const checkStudent = async () => {
    if (verifyData) {
      let schoolName = verifyData.schoolName;
      try {
        const response = await axios.get("http://localhost:1516/get/students", {
          params: {
            schoolName: schoolName,
          },
        });
        setStudent(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkCourses = async () => {
    if (verifyData) {
      let schoolName = verifyData.schoolName;
      try {
        const response = await axios.get("http://localhost:1516/get/courses", {
          params: {
            schoolName: schoolName,
          },
        });
        setCourses(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          LogOut(); // Perform logout if token is not found
          return;
        }

        const response = await axios.get("http://localhost:1516/verifytoken", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        let gg = response.data.data;

        setVerifyData(gg);
        setExpired(false); // Reset expired state if token is valid
        checkTeacher();
        checkStudent()
        checkCourses()
      } catch (error) {
        if (error.response && error.response.data) {
          let tokenExpire = error.response.data.message;
          setExpired(tokenExpire);
          LogOut(); // Perform logout immediately
        }
      }
    };

    verifyToken(); // Verify token immediately when the component renders
  }); // Note: Dependency array is empty to run only on mount

  return { verifyData, expired, LogOut, teachers, students, courses };
};

export default VerifyToken;
