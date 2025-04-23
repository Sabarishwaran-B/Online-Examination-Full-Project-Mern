import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./StuHeader";
import Home from "./StuHome";
import Exams from "./Exams";
import Add from "./Attend";
import Result from "./StuResult";
import "./student.css";

const Student = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="maincontent">
        <Header />
        <Routes>
          <Route path="/student" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/add/:examId" element={<Add />} />
          <Route path="/exams" element={<Exams />} />
        </Routes>
      </div>
    </div>
  );
};

export default Student;
