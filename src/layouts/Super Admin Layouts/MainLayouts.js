import React from "react";
import SideNav from "../../components/Super Admin/Dashboard/Navbar/Sidenav";
import Navbar from "../../components/Super Admin/Dashboard/Navbar/Navbar";

const MainLayouts = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-100">
        <SideNav />
        <div className="mara pp flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MainLayouts;
