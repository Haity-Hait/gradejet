import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const VerifyStudToken = () => {
  const [expired, setExpired] = useState(false);
  const [verifyData, setVerifyData] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sch, setSch] = useState([]);
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("Stoken");
    navigate("/student/auth");
  };

  const fetchData = async (schoolName, schoolEmail) => {
    try {
      const response = await axios.get("https://gradejet-backend.onrender.com/get/teachers", {
        params: {
          schoolEmail: schoolEmail,
        },
      });
      setTeachers(response.data.message);
      console.log(teachers);
      const response1 = await axios.get("https://gradejet-backend.onrender.com/get/students", {
        params: {
          schoolEmail: schoolEmail,
        },
      });
      setStudents(response1.data.message);

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
      console.log(sch);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("Stoken");
        if (!token) {
          LogOut(); // Perform logout if token is not found
          return;
        }

        const response = await axios.get(
          "https://gradejet-backend.onrender.com/student/verifytoken",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        const gg = response.data.data;
        console.log(gg);
        if (response.data && gg) {
          setVerifyData(gg);
          setExpired(false); // Reset expired state if token is valid
          fetchData(gg.schoolName, gg.schoolEmail);
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
  }, []); // Dependency array is empty to run only on mount

  return { verifyData, expired, sch, LogOut, teachers, students, courses };
};

export default VerifyStudToken;
