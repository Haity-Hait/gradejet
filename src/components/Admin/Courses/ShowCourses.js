import axios from "axios";
import React, { useEffect, useState } from "react";
import VerifyToken from "../../VerifyToken";
const ShowCourses = () => {
  // let [courses, setCourses] = useState([]);
  const { verifyData, courses } = VerifyToken();
  const schoolName = verifyData.schoolName;
  const [isElementVisible, setIsElementVisible] = useState(true);

  // const check = () => {
  //   axios
  //     .get(`http://localhost:1516/get/courses`, {
  //       params: {
  //         schoolName: schoolName,
  //       },
  //     })
  //     .then((res) => {
  //       setCourses(res.data.message);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setIsElementVisible(!isElementVisible);
  // };
  // useEffect(() => {
  //   check();
  // }, []);
  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">S/N</th>
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Course Time Per Day</th>
            <th className="px-4 py-2">Course Type</th>
            <th className="px-4 py-2">Course Duration</th>
            {/* <button className="btn-primary" onClick={check}>
              {isElementVisible ? "Hide Table" : "Show Table"}
            </button> */}
          </tr>
        </thead>
        <tbody>
          {
            courses.length > 0 ? (
              courses.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.courseName}</td>
                  <td className="border px-4 py-2">{item.courseTimePerDay}</td>
                  <td className="border px-4 py-2">{item.courseType}</td>
                  <td className="border px-4 py-2">
                    {item.courseDuration + " Years"}
                  </td>
                  <td className="border px-4 py-2"></td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 red" colSpan="6">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default ShowCourses;
