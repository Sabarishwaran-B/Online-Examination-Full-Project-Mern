import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Headers from "./AHeader";
import Home from "./Home";
import Users from "./Users";
import Exams from "./Exams";
import "./Admin.css"

const Admin = () => {
  return (
    
      <div className="dashboard-containers">
        <Sidebar />
        <div className="main-contents">
          <Headers />
          <Routes>
            <Route path="/admin" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/exams" element={<Exams />} />
          </Routes>
        </div>
      </div>
    
  );
};

export default Admin;