import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const VerifyToken = () => {
  const [expired, setExpired] = useState();
  const [verifyData, setVerifyData] = useState([]);
  const navigate = useNavigate()
  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/admin/signin");
  };
  setInterval(
    useEffect(() => {
      axios
        .get("http://localhost:1516/verifytoken", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let gg = res.data.data;
          setVerifyData(gg);
        })
        .catch((err) => {
          let tokenExpire = err.response.data.message;
          setExpired(tokenExpire);
        });
    }, []),
    1000
  );
  return { verifyData, expired, LogOut };
};

export default VerifyToken;
