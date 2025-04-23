import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ setRole }) => {
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setInstructor(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    
    navigate("/");
  };

  return (
    <div className="sidebars">
      <div className="profile">
        <div className="avatar">👤</div>
        <p className="name">{instructor ? instructor.username : "Instructor"}</p>
        <p className="role">Instructor</p>
      </div>
      <nav>
        <Link to="/instructor">🏠 Home</Link>
        <Link to="/exams">📜 My Exams</Link>
        <Link to="/result">📊 Result</Link>
      </nav>
      <button className="logou" onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Sidebar;
