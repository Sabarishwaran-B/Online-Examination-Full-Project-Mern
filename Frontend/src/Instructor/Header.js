import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="headers">
      <nav>
        <div className="logo">
          <a ><span>SW</span></a>
        </div>
        <button className="logoutbtn" onClick={handleLogout}>
          Log out
        </button>
      </nav>
    </header>
  );
};

export default Header;
