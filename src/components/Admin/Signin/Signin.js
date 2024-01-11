import React, { useContext, useEffect, useState } from "react";
import { LightLogo } from "../../../assets/Images";
import "./signin.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { Testing } from "../../../App";
import { ToastContainer, toast } from "react-toastify";



const Signinadmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState([]);
  const navigate = useNavigate()
  let data = {email, password}

  const check = (e) => {
    e.preventDefault();
    axios.post("https://gradejet-backend.onrender.com/get/school/v1", data).then((res) => {
      let token = res.data.token
      toast.success(res.data.message)
      localStorage.setItem("token", token)
      navigate("/admin/dashboard")
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  };  

  return (
    <div className="body">
      <ToastContainer />
      <form className="main shadow-md" noValidate>
        <img className="img" src={LightLogo} alt="" />
        <input
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          type="email"
          className="email"
        />
        <input
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="password"
        />
        <div className="base">
          <button onClick={(e) => check(e)} className="btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signinadmin;
