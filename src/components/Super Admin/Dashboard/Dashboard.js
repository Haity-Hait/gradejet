import React, { useState, useEffect } from "react";
import MainLayouts from "../../../layouts/Super Admin Layouts/MainLayouts";
import "./dashboard.css";
import { LuSchool } from "react-icons/lu";
import { MegaphoneIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
// import Accordion22 from "../../../Accordion22";
import Accordion22 from "../../../Accordion22";

import axios from "axios";
const Dashboard = () => {
  let [amount, setAmount] = useState([])
  const [notice, setNotice] = useState([]);

  
  
  useEffect(() => {
    axios.get("https://gradejet-backend.onrender.com/get/school").then((res) => {
      // console.log();
      setAmount(res.data.result)
    }).catch((err) => {
      console.log(err);
    })
    axios
      .get("https://gradejet-backend.onrender.com/get/admin/super/notice")
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
    <MainLayouts>
      <div className=" px-3">
        <div className="flex fall justify-between items-center">
          <div className="blue p-3">
            <h1 className="wel">Welcome Back To GradeJet</h1>
          </div>
          <div className="sch">
            <LuSchool className="nan" />
            <p className=" mx-4">Total Number of Schools</p>
            <p className="ppaa ">{amount.length}</p>
          </div>
        </div>
        <div className=" mt-20">
        <div className=" mt-7">
              <div className="notice kiss">
                <div className="nes">
                  <p>Notice</p>
                  <MegaphoneIcon className=" w-5" />
                </div>
                {notice.map((item, key) => (
                  <Accordion22 datas={item} key={key} />
                ))}
              </div>
            </div>
        </div>
      </div>
    </MainLayouts>
  );
};

export default Dashboard;
