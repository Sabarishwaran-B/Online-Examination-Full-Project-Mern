import "./FrontHome.css";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navi=useNavigate();
  return (
    <div className="Home-container">
      {/* Navbar */}
     
      
      {/* Main Content */}
      <div className="main">
      <div class="Hlogo">
                <a href="www.google.com"><span>SW</span></a>
            </div>
        <div className="b">
        <div className="text-section">
          <h1>Hello!! <span role="img" aria-label="smile">😊</span></h1>
         
         
      
        </div>
        <div className="c">
        <div className="box" onClick={()=>navi("/login")}>
       <img src="icons8-administrator-94.png" alt="Admin"></img>
        <h6>Admin</h6>
        </div>
        <div className="box" onClick={()=>navi("/login")}>
        <img src="icons8-man-94.png" alt="instructor"></img>
        <h6>Instructor</h6>
        </div>
        <div className="box" onClick={()=>navi("/login")}>
        <img src="icons8-student-94.png" alt="student"></img>
        <h6>Student</h6>
        </div>
        </div>
      </div>  </div>
      <div className="foot">
        <p>@copyright</p>
      </div>
    </div>
  );
};

export default Homepage;
