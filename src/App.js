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
import AdminNotice from "./components/Admin/Notices/AdminNotice";
// import GeneraTeachers from "./components/Admin/GenerateTeachers/GeneraTeachers";
import Courses from "./components/Admin/Courses/Courses";
import Loader from "./Loader";
import GenerateStudents from "./components/Admin/GenerateStudents/GenerateStudents";
import Showstudent from "./components/Admin/Dashboard/ShowStudents/Showstudent";
import ShowTeachers from "./components/Admin/Dashboard/ShowTeachers/ShowTeachers";


import GenerateTeachers from "./components/Admin/GenerateTeachers/GeneraTeachers";
import ShowCourses from "./components/Admin/Dashboard/ShowCourses/ShowCourses";
import LandingPage from "./components/LandingPage/LandingPage";
import DashboardTeacher from "./components/Teacher/Dashboard/Dashboard";
import Signinteacher from "./components/Teacher/auth/Signin";
import TeacherNotice from "./components/Teacher/Notice/Notice";
import Signinstudent from "./components/Students/Auth/Signin";
import StudentDashboard from "./components/Students/Dashboard/Dashboard.js";
import Department from "./components/Admin/Department/Department.js";
import GradeStudent from "./components/Teacher/Grade Students/GradeStudent.js";
import StudentCourse from "./components/Students/Course/Course.js";
import MyCourse from "./components/Students/MyCourse/MyCourse.js";
export const Testing = createContext()
function App() {
const [value, setValue] = useState([])

  return (
    <Testing.Provider value={{ value, setValue }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />

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
          <Route path="/admin/display-student" element={<Showstudent />} />
          <Route path="/admin/display-teacher" element={<ShowTeachers />} />
          <Route path="/admin/display-course" element={<ShowCourses />} />
          <Route path="/admin/department" element={<Department />} />

          <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
          <Route path="/teacher/auth" element={<Signinteacher />} />
          <Route path="/teacher/notice" element={<TeacherNotice />} />
          <Route path="/teacher/grade-student" element={<GradeStudent />} />

          {/* Students */}
          <Route path="/student/auth" element={<Signinstudent />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/pick-course" element={<StudentCourse />} />
          <Route path="/student/mycourse" element={<MyCourse />} />



          <Route path="/student/generate" element={<GenerateStudents />} />
          <Route path="*" element="Yo not a page" />
        </Routes>
        {/* <h1 className=" text-red-600">Production mode</h1> */}
      </div>
    </Testing.Provider>
  );
}

export default App;
