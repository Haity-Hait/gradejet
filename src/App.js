import { Route, Routes } from "react-router";
import GenerateStudents from "./components/GenerateStudents";
import SigninStudents from "./components/SigninStudents";
import GenerateTeacher from "./components/GenerateTeacher";
import SigninTeacher from "./components/SigninTeacher";
import HomeTeach from "./components/HomeTeach";
import ExamsRecord from "./components/ExamsRecord";
import ExamSidebar from "./components/ExamSidebar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/student/generate" element={<GenerateStudents />} />
        <Route path="/student/signin" element={<SigninStudents />} />
        <Route path="/teacher/generate" element={<GenerateTeacher />} />
        <Route path="/teacher/dashboard" element={<HomeTeach />} />
        <Route path="/teacher/signin" element={<SigninTeacher />} />
        <Route path="/teacher/examrecords" element={<ExamsRecord />} />
        <Route path="/sidebar" element={<ExamSidebar />} />
        <Route path="*" element="Yo not a page" />
      </Routes>
      {/* <h1 className=" text-red-600">Production mode</h1> */}

    </div>
  );
}

export default App;
