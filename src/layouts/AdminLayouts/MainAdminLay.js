import React, { useEffect } from "react";
import SidebarAdmin from "../../components/Admin/Sidebar/SidebarAdmin";
import VerifyToken from "../../components/VerifyToken";
import { useNavigate } from "react-router";
import Modal from "../../components/Admin/Modal/Modal";
const MainAdminLay = ({ children }) => {
  const { verifyData, expired } = VerifyToken();
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/admin/signin");
  };

  
    // setInterval(useEffect(() => {
    //   if (!expired) {
    //     console.log(expired);
    //   }else{
    //     console.log(expired);
    //   }
    // }), 1000);

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
      {expired ? <Modal Myclick={LogOut} Content={expired} /> : ""}
      {/* {expired ? navigate("/admin/signin") : ""} */}
    </div>
  );
};

export default MainAdminLay;
