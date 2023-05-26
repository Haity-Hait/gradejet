import React from "react";
import SideNav from "../../components/Super Admin/Dashboard/Navbar/Sidenav";

const MainLayouts = ({ children }) => {
  return (
    <div className="flex">
      <SideNav />
      <div className="h-screen flex-1">
        { children }
      </div>
    </div>
  );
};

export default MainLayouts;
