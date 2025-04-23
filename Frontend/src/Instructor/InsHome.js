import { useEffect, useState } from "react";
import "./InsHome.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navig=useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [exams, setExams] = useState([]);
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setInstructor(parsedUser);

      // Fetch exams created by this instructor only
      axios.get(`http://localhost:5000/api/exams/instructor/${parsedUser.id}`)
        .then((res) => {
          setExams(res.data);
        })
        .catch((err) => {
          console.error("Failed to load exams:", err);
        });
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-contents">
        {instructor && (
          <>
            <div className="profile-cards">
              <div className="profile-icons">👤</div>
              <div className="profile-details">
                <p className="user-name">{instructor.username}</p>
                <p className="email">📧 {instructor.email}</p>
              </div>
              <p className="exam-count">Total Exam Conducted: {exams.length}</p>
            </div>

            <div className="exam-statuss" >
              {exams.map((exam) => (
                <div className="exam-cards" key={exam.id}  onClick={() => navig(`/exam/${exam._id}`)}>
                  <h3>{exam.title}</h3>
                  <p className="statuss">{exam.status || "ongoing"}</p>
                  <p>No. of Students: {exam.totalStudents || 0}</p>
                </div>
              ))}
            </div>

            <button
              className="results"
              onClick={() => window.location.href = "/result"}
            >
              view results
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
