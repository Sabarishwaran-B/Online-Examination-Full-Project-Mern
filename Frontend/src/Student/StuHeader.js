import "./StuHeader.css";
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
    <header className="sheader">
      <nav>
        <div className="logo">
          <a>
            <span>SW</span>
          </a>
        </div>
        <button className="log" onClick={handleLogout}>
          Log out
        </button>
      </nav>
    </header>
  );
};

export default Header;
