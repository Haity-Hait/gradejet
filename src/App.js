import { Route, Routes } from "react-router";
import GenerateTeacher from "./components/Admin/GenerateTeacher";
import Signin from "./components/Super Admin/Signin/Signin";
import Dashboard from "./components/Super Admin/Dashboard/Dashboard";
import GenerateSchool from "./components/Super Admin/Generate School/GenerateSchool";
import Schools from "./components/Super Admin/Schools/Schools";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/teacher/generate" element={<GenerateTeacher />} />
        <Route path="/superadmin/signin" element={<Signin />} />
        <Route path="/superadmin/dashboard" element={<Dashboard />} />
        <Route path="/superadmin/generate/school" element={<GenerateSchool />} />
        <Route path="/superadmin/school/list" element={<Schools />} />
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
  );
}

export default App;
