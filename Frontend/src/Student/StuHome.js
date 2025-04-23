import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StuHome.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setStudent(parsedUser);

      // Same structure as instructor: GET /api/exams/student/:id
      axios.get(`http://localhost:5000/api/exams/student/${parsedUser.id}`)
        .then((res) => {
          setExams(res.data);
        })
        .catch((err) => {
          console.error("Failed to load exams:", err);
        });
    }
  }, []);

  if (!student) return <p>Loading student profile...</p>;

  return (
    <div className="student-profile-container">
      <div className="profile-card">
        <div className="profile-icon">👤</div>
        <div className="profile-details">
          <p className="user-name">{student.username}</p>
          <p className="email">📧 {student.email}</p>
        </div>
        <p className="exam-count">Total Exam Completed: {exams.length}</p>
      </div>

      <div className="bot">
        <div className="student-image">
          <img src="/stu.png" alt="Student" />
        </div>
        <div className="view-buttons">
          <button onClick={() => navigate("/exams")}>View Exams &gt;&gt;</button>
          <button onClick={() => navigate("/result")}>View Results &gt;&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
