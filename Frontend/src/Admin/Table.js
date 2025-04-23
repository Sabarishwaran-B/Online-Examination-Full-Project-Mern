import { useState, useEffect } from "react";
import "./Table.css";

const Table = ({ title }) => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);

  const fetchExams = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/exams");
      const data = await res.json();
      setExams(data.exams || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch exams.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this exam?")) return;
    try {
      await fetch(`http://localhost:5000/api/admin/exams/${id}`, { method: "DELETE" });
      setExams(exams.filter((exam) => exam._id !== id));
    } catch (err) {
      alert("Error deleting exam.");
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="table-container">
      <h3>{title}</h3>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Instructor</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td onClick={() => setSelectedExam(exam)} className="clickable">{exam.name}</td>
              <td>{exam.instructor}</td>
              <td>{exam.status}</td>
              <td className="rem" onClick={() => handleDelete(exam._id)}>Remove</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedExam && (
  <div className="exam-details">
    <h4>Exam Details</h4>
    <p><strong>Title:</strong> {selectedExam.name}</p>
    <p><strong>Instructor:</strong> {selectedExam.instructor}</p>
    <p><strong>Status:</strong> {selectedExam.status}</p>
    
    <h5>Questions:</h5>
   
      <ul>
        {selectedExam.questions.map((q, idx) => (
          <li key={idx}>
            <p><strong>Q{idx + 1}:</strong> {q.question}</p>
            <ul>
              {q.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            <p><strong>Answer:</strong> {q.correctAnswer}</p>
          </li>
        ))}
      </ul>
    <button onClick={() => setSelectedExam(null)}>Close</button>
  </div>
)}

    </div>
  );
};

export default Table;
