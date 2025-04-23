import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import "./Login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    const { username, email, phone, gender, role, password, confirmPassword } = formData;

    if (!username || !email || !phone || !gender || !role || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone, gender, role, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      alert("Signup successful! Redirecting to login page.");
      navigate("/login"); 
    } catch (err) {
      setLoading(false);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="ccontainer">
      <div className="logos">
        <Link to="/">
          <span>SW</span>
        </Link>
      </div>

      <div className="main-content">
        <div className="sign-form">
          <GiArchiveRegister className="form-icon" />
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaUser className="input-icon" />
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <FaUser className="input-icon" />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className="login-btn" onClick={handleSignup} disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </button>

          <p className="signup-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p className="pre" onClick={() => navigate("/Fhome")}>
            &lt;&lt; Home
          </p>
        </div>
      </div>

      <div className="foot">
        <p>&copy; 2025</p>
      </div>
    </div>
  );
};

export default Signup;
