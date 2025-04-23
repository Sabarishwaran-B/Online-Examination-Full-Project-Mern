import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Add.css";

const Add = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const instructor = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
console.log(localStorage.getItem("user"));
const currentUserId = instructor && instructor.id ? instructor.id : null;


  const handleAddQuestion = () => {
    if (
      newQuestion.text.trim() === "" ||
      newQuestion.options.some((opt) => opt.trim() === "") ||
      newQuestion.answer.trim() === ""
    ) {
      alert("Please fill in all fields before adding a question.");
      return;
    }

    setQuestions([...questions, { id: questions.length + 1, ...newQuestion }]);
    setNewQuestion({ text: "", options: ["", "", "", ""], answer: "" });
  };

  const handleSubmitExam = async () => {
    if (title.trim() === "" || questions.length === 0) {
      alert("Please enter an exam title and add at least one question.");
      return;
    }
  
    const formattedQuestions = questions.map((q) => ({
      question: q.text,
      options: q.options,
      correctAnswer: q.answer,
    }));
  console.log(currentUserId);
    const payload = {
      title,
      instructor: currentUserId,
      questions: formattedQuestions,
    };
  
    console.log("Submitting Exam:", payload);
  
    try {
      await axios.post("http://localhost:5000/api/exams/add", payload);
      alert("Exam submitted successfully!");
      navi("/exams");
    } catch (err) {
      console.error("Error submitting exam:", err.response?.data || err.message);
      alert("Failed to submit exam.");
    }
  };
  
  return (
    <div className="dashboard-container">
      <div className="create-exam-content">
        <h2>Create Exam</h2>
        .<div className="a">
        <input
          type="text"
          placeholder="Enter Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          
        /></div>
        <div className="question-list">
          {questions.map((q, index) => (
            <div key={q.id} className="question-item">
              <p>
                {index + 1}) {q.text}
              </p>
              <ul>
                {q.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
              <p className="correct-answer">Ans: {q.answer}</p>
            </div>
          ))}
        </div>

        <div className="add-question">
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion.text}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, text: e.target.value })
            }
          />
          {newQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const updatedOptions = [...newQuestion.options];
                updatedOptions[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options: updatedOptions });
              }}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={newQuestion.answer}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, answer: e.target.value })
            }
          />
          <button onClick={handleAddQuestion}>+ Add Question</button>
        </div>

        <button className="submit-exam" onClick={handleSubmitExam}>
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default Add;
