import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Edit.css";
const EditExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/exams/${id}`)
      .then((res) => setExam(res.data))
      .catch((err) => console.error("Error loading exam:", err));
  }, [id]);

  const handleChange = (index, field, value) => {
    const updated = [...exam.questions];
    updated[index][field] = value;
    setExam({ ...exam, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...exam.questions];
    updated[qIndex].options[oIndex] = value;
    setExam({ ...exam, questions: updated });
  };

  const addOption = (index) => {
    const updated = [...exam.questions];
    updated[index].options.push("");
    setExam({ ...exam, questions: updated });
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...exam.questions];
    updated[qIndex].options.splice(oIndex, 1);
    setExam({ ...exam, questions: updated });
  };

  const addQuestion = () => {
    setExam({
      ...exam,
      questions: [
        ...exam.questions,
        { question: "", options: ["", ""], correctAnswer: "" }
      ]
    });
  };

  const removeQuestion = (index) => {
    const updated = [...exam.questions];
    updated.splice(index, 1);
    setExam({ ...exam, questions: updated });
  };

  const handleStatusChange = (e) => {
    setExam({ ...exam, status: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/exams/${id}`, exam);
      alert("Exam updated successfully!");
      navigate("/exams");
    } catch (err) {
      console.error("Error updating exam:", err);
    }
  };

  if (!exam) return <p>Loading...</p>;

  return (
    <div className="edit-exam">
      <h2>Edit Exam: {exam.title}</h2>

      <label>Status:</label>
      <select value={exam.status} onChange={handleStatusChange}>
        <option value="Not Started">Not Started</option>
        <option value="Started">Started</option>
        <option value="Completed">Completed</option>
      </select>

      {exam.questions.map((q, index) => (
        <div key={index} className="question-block">
          <h4>Question {index + 1}</h4>
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleChange(index, "question", e.target.value)}
          />
          <p>Options:</p>
          {q.options.map((opt, oIndex) => (
            <div key={oIndex}>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
              />
              <button onClick={() => removeOption(index, oIndex)}>Remove Option</button>
            </div>
          ))}
          <button onClick={() => addOption(index)}>Add Option</button>
          <p>Correct Answer:</p>
          <input
            type="text"
            value={q.correctAnswer}
            onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
          />
          <button onClick={() => removeQuestion(index)}>Delete Question</button>
        </div>
      ))}
      <button onClick={addQuestion}>Add New Question</button>
      <br />
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditExam;
