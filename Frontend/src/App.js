import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./FrontHome";
import Login from "./Loginin";
import Signup from "./Signup";
import AdminRoutes from "./Admin/Admin";
import InstructorRoutes from "./Instructor/Instructor";
import StudentRoutes from "./Student/student";
import "./App.css";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login setRole={setRole} />} />
      <Route path="/signup" element={<Signup />} />

      {role === "admin" && <Route path="/*" element={<AdminRoutes />} />}
      {role === "instructor" && <Route path="/*" element={<InstructorRoutes />} />}
      {role === "student" && <Route path="/*" element={<StudentRoutes />} />}

      <Route path="*" element={<Navigate to={role ? `/${role}` : "/login"} />} />
    </Routes>
  );
}

export default App;
