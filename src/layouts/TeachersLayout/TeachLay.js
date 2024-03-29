import React, { useEffect } from "react";
import VerifyToken from "../../components/VerifyToken";
import { useNavigate } from "react-router";
import SidebarTeach from "../../components/Teacher/Sidebar/Sidebar";
import VerifyTeachToken from "../../components/Teacher/VerifyToken";
import { Spinner } from "../../assets/Images";
const MainTeachLay = ({ children }) => {
  const navigate = useNavigate();
   const {verifyData, sch, LogOut} = VerifyTeachToken();
   console.log(sch);
  return (
    <div>
      <div className="flex">
        <div className="sticky kk top-0">
          <SidebarTeach
            ADMINLOGO={sch.image}
            LOGOUT={() => LogOut()}
            TeacherName={verifyData.schoolName}
          />
        </div>
        <div className="flex-1 ">{children}</div>
      </div>
      {!verifyData.image ? <div className=" position-absolute top-0 left-0">
        <img src={Spinner} />
      </div> : ""}
    </div>
  );
};

export default MainTeachLay;
