import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Exam.css";

const StudentExam = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/exams")
      .then(res => setExams(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="student-exam-container">
      <div className="background-image">
        <img src="/stu.png" alt="Student" />
      </div>
      <div className="exam-grid">
        {exams.map((exam) => (
          <div key={exam._id} className="exam-card">
            <h3>{exam.title}</h3>
            <p className="exam-instructor">
              Instructor: {exam.instructor?.username || exam.instructor}
            </p>
            <button className="start-btn" onClick={() => navigate(`/add/${exam._id}`)}>Start</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExam;
