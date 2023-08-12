import React, { useEffect } from "react";
import SidebarAdmin from "../../components/Admin/Sidebar/SidebarAdmin";
import VerifyToken from "../../components/VerifyToken";
import { useNavigate } from "react-router";
const MainAdminLay = ({ children }) => {
  const { verifyData, expired, LogOut } = VerifyToken();
  const navigate = useNavigate();
    
  return (
    <div>
      <div className="flex">
        <div className="sticky kk top-0">
          <SidebarAdmin
            ADMINLOGO={verifyData.image}
            LOGOUT={() => LogOut()}
            SCHOOLNAME={verifyData.schoolName}
          />
        </div>
        <div className="flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default MainAdminLay;
