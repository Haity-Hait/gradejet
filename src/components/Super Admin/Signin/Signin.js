import React, { useEffect, useState } from "react";
import { LightLogo } from "../../../assets/Images";
import "./signin.css";
import { useNavigate } from "react-router";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate  = useNavigate()
  const check = (e) => {
    e.preventDefault();
    if (email == "gradejet@gmail.com") {
      document.getElementById("email").classList.add("is-valid");

      if (password == "oriyomiayomide15") {
        alert("Sign In Successful");
        document.getElementById("email").classList.add("is-valid");
        document.getElementById("password").classList.add("is-valid");
        navigate("/superadmin/dashboard")
      } else {
        alert("Invalid Password");
        document.getElementById("password").classList.add("is-invalid");
        document.getElementById("email").classList.add("is-valid");
      }
    } else {
      alert("Not The App Owner");
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("password").classList.add("is-invalid");
    }
  };
  return (
    <div className="body">
      <form className="main shadow-md" noValidate>
        <img className="img" src={LightLogo} alt="" />

        <input
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          type="email"
          className="form-control email"
        />
        <input
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="form-control password"
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

export default Signin;
