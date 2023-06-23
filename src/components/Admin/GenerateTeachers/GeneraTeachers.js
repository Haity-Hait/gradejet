import React from "react";
import MainAdminLay from "../../../layouts/AdminLayouts/MainAdminLay";
import { LuSchool2 } from "react-icons/lu";

const GeneraTeachers = () => {
  return (
    <MainAdminLay>
      <div>
        <div className="fex ml-5">
          <LuSchool2 className="icon" />
          <h3>Generate Teachers</h3>
        </div>
      </div>
    </MainAdminLay>
  );
};

export default GeneraTeachers;
