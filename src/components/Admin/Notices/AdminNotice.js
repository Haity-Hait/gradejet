import React, { useState } from "react";
import MainLayouts from "../../../layouts/Super Admin Layouts/MainLayouts";
import { LuSchool2 } from "react-icons/lu";
import axios from "axios";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import VerifyToken from "../../VerifyToken";
import { ToastContainer, toast } from "react-toastify";
import Time from "../../Time";
const AdminNotice = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [notice, setNotice] = useState("");
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  const { verifyData, expired } = VerifyToken()
  let sender = verifyData.schoolName
  let senderEmail = verifyData.email
  let data = { from, to, notice, date, time, sender, senderEmail };

  const send = () => {
    console.log(time);
    axios
      .post("http://localhost:1516/notice", data)
      .then((res) => {
        toast.success(`Notice sent to all ${res.data.message.to}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
      setFrom('')
      setTo('')
      setNotice('')
  };
   

  return (
    <MainAdminLay>
      <ToastContainer />
      <div className=" px-5 py-2">
        <div className="flex foster justify-between">
        <div className="waist px-3">
          <h3 className="bop">Notices</h3>
        </div>
          <div className="e">
            <Time STYLE="meo" />
          </div>
          <div className="sete  flex items-center gap-5">
            <div className="flex items-center gap-3">
              <p>From:</p>
              <select
                className="form-control"
                onChange={(e) => setFrom(e.target.value)}
                value={from}
              >
                <option selected></option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <p>To:</p>
              <select
                className="form-control"
                onChange={(e) => setTo(e.target.value)}
                value={to}
              >
                <option selected></option>
                <option value="teachers">Teachers</option>
                <option value="student">Students</option>
                <option value="GradeJet Management">GradeJet Management</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <textarea
            onChange={(e) => setNotice(e.target.value)}
            className="bubo"
            value={notice}
          ></textarea>
        </div>
        <div className="loader">
          <button onClick={send}>Send</button>
        </div>
      </div>
    </MainAdminLay>
  );
};

export default AdminNotice;
