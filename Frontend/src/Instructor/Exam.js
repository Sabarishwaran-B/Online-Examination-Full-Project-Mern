import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Exam.css";

const Exam = () => {
  const navig = useNavigate();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      axios
        .get(`http://localhost:5000/api/exams/instructor/${parsedUser.id}`)
        .then((res) => {
          setExams(res.data);
        })
        .catch((err) => {
          console.error("Failed to load exams:", err);
        });
    }
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      let newStatus;
      if (currentStatus === "Not Yet Started") newStatus = "Started";
      else if (currentStatus === "Started") newStatus = "Completed";
      else return;

      await axios.put(`http://localhost:5000/api/exams/${id}/status`, {
        status: newStatus,
      });

      setExams((prev) =>
        prev.map((exam) =>
          exam._id === id ? { ...exam, status: newStatus } : exam
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`);
      setExams((prev) => prev.filter((exam) => exam._id !== id));
    } catch (err) {
      console.error("Failed to delete exam:", err);
    }
  };

  return (
    <div className="add-course-container">
      <div className="course-section">
        <div className="add-course" onClick={() => navig("/add")}>
          <div className="add-icon">➕</div>
          <p>Add Exam</p>
        </div>

        {exams.map((exam, idx) => (
          <div
            className="course-card"
            key={idx}
            onClick={() => navig(`/exam/${exam._id}`)}
          >
            <h3>{exam.title}</h3>
            <p className="status">{exam.status}</p>

            <div className="button-group">
              {exam.status !== "Completed" && (
                <button
                  className="start-bt"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStatus(exam._id, exam.status);
                  }}
                >
                  {exam.status === "Not Yet Started" ? "Start" : "End"}
                </button>
              )}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteExam(exam._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <table className="exam-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Status</th>
            <th>No. of Students</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, idx) => (
            <tr key={idx}>
              <td>{exam.title}</td>
              <td>{exam.status}</td>
              <td>{exam.totalStudents}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="view-results"  onClick={() => window.location.href = "/result"}>
        view results
      </button>
    </div>
  );
};

export default Exam;
