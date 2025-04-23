import "./AHeader.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <a >
            <span>SW</span>
          </a>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </nav>
    </header>
  );
};

export default Header;
