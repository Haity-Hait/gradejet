import React, { useEffect } from "react";
import SidebarAdmin from "../../components/Admin/Sidebar/SidebarAdmin";
import VerifyToken from "../../components/VerifyToken";
import { useNavigate } from "react-router";
import Modal from "../../components/Admin/Modal/Modal";
import Loader from "../../Loader";
const MainAdminLay = ({ children }) => {
  const { verifyData, expired, LogOut } = VerifyToken();
  const navigate = useNavigate();
  
    // if(!verifyData){

    // }

    // setInterval(useEffect(() => {
    //   if (expired) {
    //     LogOut()
    //   }
    // }), 0);

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
      
      {/* {expired ? <Modal Myclick={LogOut} Content={expired} /> : ""} */}
      {verifyData ? "" : <Loader/> }
      {expired ? LogOut() : ""}
    </div>
  );
};

export default MainAdminLay;
