  import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const VerifyTeachToken = () => {
  const [expired, setExpired] = useState(false);
  const [verifyData, setVerifyData] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("Ttoken");
    navigate("/teacher/auth");
  };

  const fetchData = async (schoolName) => {
    try {
      const response = await axios.get("http://localhost:1516/get/teachers", {
        params: {
          schoolName: schoolName,
        },
      });
      setTeachers(response.data.message);
      console.log(teachers);
      const response1 = await axios.get("http://localhost:1516/get/students", {
        params: {
          schoolName: schoolName,
        },
      });
      setStudents(response1.data.message);

      const response2 = await axios.get("http://localhost:1516/get/courses", {
        params: {
          schoolName: schoolName,
        },
      });
      setCourses(response2.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("Ttoken");
        if (!token) {
          LogOut(); // Perform logout if token is not found
          return;
        }

        const response = await axios.get(
          "http://localhost:1516/teacher/verifytoken",
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
          fetchData(gg.schoolName);
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

  return { verifyData, expired, LogOut, teachers, students, courses };
};

export default VerifyTeachToken;
