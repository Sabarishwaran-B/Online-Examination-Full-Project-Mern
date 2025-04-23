import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setStudent(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar">👤</div>
        <p className="name">{student ? student.username : "Student"}</p>
        <p className="role">Student</p>
      </div>
      <nav>
        <Link to="/student">🏠 Home</Link>
        <Link to="/exams">📜 Exams</Link>
        <Link to="/result">📊 Result</Link>
      </nav>
      <button className="logout" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
