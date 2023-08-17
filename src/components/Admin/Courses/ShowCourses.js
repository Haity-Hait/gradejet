import axios from "axios";
import React, { useEffect, useState } from "react";
import VerifyToken from "../../VerifyToken";
import { FaPen, FaTrash } from "react-icons/fa";
const ShowCourses = () => {
  // let [courses, setCourses] = useState([]);
  const { verifyData, courses } = VerifyToken();
  const schoolName = verifyData.schoolName;
  const [isElementVisible, setIsElementVisible] = useState(true);
  const edit = (index) => {
    console.log(courses);
  };
  const del = (index) => {
    console.log("Heeyyyy delete");
  };

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
          {courses.length > 0 ? (
            courses.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  {item.courseName}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.courseTimePerDay}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.courseType}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.courseDuration + " Years"}
                </td>
                <td className="border px-4 py-2 text-center  gap-4 text-gray-400">
                  <div className="flex gap-4">
                    <FaPen
                      className=" hover:text-black blu"
                      onClick={() => edit(index)}
                    />
                    <FaTrash
                      className=" hover:text-black blu"
                      onClick={() => del(index)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 red" colSpan="6">
                <h1>You currently have no courses available.</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCourses;
