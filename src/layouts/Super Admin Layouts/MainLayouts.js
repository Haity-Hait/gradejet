import React from "react";
import Navbar from "../../components/Super Admin/Dashboard/Navbar/Navbar";
import Sidenav from "../../components/Super Admin/Dashboard/Navbar/Sidenav";

const MainLayouts = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-100">
        <Sidenav />
        <div className="h-screen pp flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MainLayouts;
