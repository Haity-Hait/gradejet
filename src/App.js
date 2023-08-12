import { Route, Routes } from "react-router";
import Signin from "./components/Super Admin/Signin/Signin";
import Dashboard from "./components/Super Admin/Dashboard/Dashboard";
import GenerateSchool from "./components/Super Admin/Generate School/GenerateSchool";
import Schools from "./components/Super Admin/Schools/Schools";
import ShowOne from "./components/Super Admin/Schools/ShowOne";
import Notice from "./components/Super Admin/Notice/Notice";
import UnderConstructionSuperAdmin from "./components/Under Construction/UnderConstructionSuperAdmin";
import Signinadmin from "./components/Admin/Signin/Signin";
import DashboardAdmin from "./components/Admin/Dashboard/Dashboard";
import { createContext, useContext, useState } from "react";
import Modal from "./components/Admin/Modal/Modal";
import Time from "./components/Time";
import AdminNotice from "./components/Admin/Notices/AdminNotice";
// import GeneraTeachers from "./components/Admin/GenerateTeachers/GeneraTeachers";
import Courses from "./components/Admin/Courses/Courses";
import Loader from "./Loader";
import GenerateStudents from "./components/Admin/GenerateStudents/GenerateStudents";
import GenerateTeachers from "./components/Admin/GenerateTeachers/GeneraTeachers";
import LandingPage from "./components/LandingPage/LandingPage";
export const Testing = createContext()
function App() {
const [value, setValue] = useState([])

  return (
    <Testing.Provider value={{ value, setValue }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/teacher/generate" element={<GenerateTeacher />} /> */}
          <Route path="/superadmin/signin" element={<Signin />} />
          <Route path="/superadmin/dashboard" element={<Dashboard />} />
          <Route path="/superadmin/generate/school" element={<GenerateSchool />} />
          <Route path="/superadmin/school/list" element={<Schools />} />
          <Route path="/superadmin/school/:id" element={<ShowOne />} />
          <Route path="/superadmin/notices" element={<Notice />} />
          <Route path="/superadmin/construct" element={<UnderConstructionSuperAdmin />} />
          <Route path="/admin/signin" element={<Signinadmin />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/notice" element={<AdminNotice />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/generate/teacher" element={<GenerateTeachers />} />
          <Route path="/admin/generate/student" element={<GenerateStudents />} />
          {/* <Route path="/superadmin/dashb" element={<SideNav />} /> */}
          {/* <Route path="/student/generate" element={<GenerateStudents />} />
        <Route path="/student/signin" element={<SigninStudents />} />
        <Route path="/teacher/dashboard" element={<HomeTeach />} />
        <Route path="/teacher/signin" element={<SigninTeacher />} />
        <Route path="/teacher/examrecords" element={<ExamsRecord />} />
        <Route path="/sidebar" element={<ExamSidebar />} /> */}
          <Route path="*" element="Yo not a page" />
        </Routes>
        {/* <h1 className=" text-red-600">Production mode</h1> */}
      </div>
    </Testing.Provider>
  );
}

export default App;
