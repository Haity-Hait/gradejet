import { useEffect } from "react";
import { Route, Routes } from "react-router";
import GenerateStudents from "./components/GenerateStudents";
import SigninStudents from "./components/SigninStudents";
import SendMail from "./components/SendMail";

function App() {
  return (
    <div className="App">
      <h1>Testing mode</h1>
      <Routes>
        <Route path="/generate" element={<GenerateStudents />} />
        <Route path="/student/signin" element={<SigninStudents />} />
        <Route path="/send" element={<SendMail />} />
      </Routes>
    </div>
  );
}

export default App;
