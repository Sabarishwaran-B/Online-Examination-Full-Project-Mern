import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { FaLock } from "react-icons/fa6";
import "./Login.css";

const Login = ({ setRole }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!identifier || !password) {
      setError("Please enter your email/username and password.");
      setLoading(false);
      return;
    }

    if (identifier.includes("@") && !isValidEmail(identifier)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Invalid email/username or password.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role.toLowerCase());
      localStorage.setItem("user", JSON.stringify(data.user));
      setRole(data.user.role.toLowerCase());

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setLoading(false);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="ccontainer">
      <div className="logos">
        <a href="/"><span>SW</span></a>
      </div>

      <div className="main-content">
        <div className="login-form">
          <BiLogInCircle className="form-icon" />
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <FaUserCircle className="input-icon" />
            <input
              type="text"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
          <p className="pre" onClick={() => navigate("/Fhome")}>&lt;&lt; Home</p>
        </div>
      </div>

      <div className="foot">
        <p>&copy; 2025</p>
      </div>
    </div>
  );
};

export default Login;
