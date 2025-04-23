import {  Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./InsHome";
import Exams from "./Exam";
import ExamDetails from "./ExamDetails";
import EditExam from "./EditExam";
import Add from "./Add";
import Result from "./Result";
import "./Instructor.css";
const Instructor = () => {
  return (
 
      <div className="dashboard-containerss">
        <Sidebar />
        <div className="main-contentss">
          <Header />
          <Routes>
          <Route path="/instructor" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/add" element={<Add />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exam/:id" element={<ExamDetails />} />
            <Route path="/exam/:id/edit" element={<EditExam />} />
          </Routes>
        </div>
      </div>
  );
};

export default Instructor;
