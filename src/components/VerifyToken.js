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
  const [sch, setSch] = useState([]);
  const [department, setDepartment] = useState([]);

  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/admin/signin");
  };
  const fetchData = async (schoolName, schoolEmail) => {
    try {
      const response = await axios.get("https://gradejet-backend.onrender.com/get/teachers", {
        params: {
          schoolEmail: schoolEmail,
        },
      });
      setTeachers(response.data.message);
      // console.log(teachers);
      const response1 = await axios.get("https://gradejet-backend.onrender.com/get/students", {
        params: {
          schoolEmail: schoolEmail,
        },
      });
      setStudent(response1.data.message);
      const response2 = await axios.get("https://gradejet-backend.onrender.com/get/courses", {
        params: {
          schoolName: schoolName,
        },
      });
      setCourses(response2.data.message);

      const response3 = await axios.get("https://gradejet-backend.onrender.com/get/yoursch", {
        params: {
          schoolEmail: schoolEmail,
        },
      });
      setSch(...response3.data.message);


      
    } catch (error) {
      console.error("Error fetching data:", error);
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

        const response = await axios.get("https://gradejet-backend.onrender.com/verifytoken", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        const gg = response.data.data;
        if (response.data && gg) {
          setVerifyData(gg);
          // console.log(gg)
          setExpired(false); // Reset expired state if token is valid
          fetchData(gg.schoolName, gg.email);

        }
      } catch (error) {
        if (error.response && error.response.data) {
          const tokenExpire = error.response.data.message;
          setExpired(tokenExpire);
          LogOut(); // Perform logout immediately
        }
      }
    };

    verifyToken(); // Verify token immediately when the component renders
  }, []); // Note: Dependency array is empty to run only on mount

  return { verifyData, expired, LogOut, teachers, students, courses, department };
};

export default VerifyToken;
