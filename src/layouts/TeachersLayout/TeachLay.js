import React, { useEffect } from "react";
import VerifyToken from "../../components/VerifyToken";
import { useNavigate } from "react-router";
import SidebarTeach from "../../components/Teacher/Sidebar/Sidebar";
import VerifyTeachToken from "../../components/Teacher/VerifyToken";
const MainTeachLay = ({ children }) => {
  const navigate = useNavigate();
   const {verifyData, LogOut} = VerifyTeachToken();
  return (
    <div>
      <div className="flex">
        <div className="sticky kk top-0">
          <SidebarTeach
            ADMINLOGO={verifyData.image}
            LOGOUT={() => LogOut()}
            TeacherName={verifyData.name}
          />
        </div>
        <div className="flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default MainTeachLay;
