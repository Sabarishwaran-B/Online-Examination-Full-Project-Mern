import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUserName("");
    navigate("/");
  };

  return (
    <div className="side">
      <div className="profile">
        <div className="avatar">👤</div>
        <p className="names">{userName || "Admin"}</p>
        <p className="roles">Admin</p>
      </div>
      <nav>
        <Link to="/admin">🏠 Home</Link>
        <Link to="/users">👥 Users</Link>
        <Link to="/exams">📜 Exams</Link>
      </nav>
      <button className="logout" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
