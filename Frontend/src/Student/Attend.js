import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Attend.css";

const Attend = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchExam = async () => {
      try {
        
        const res = await axios.get(`http://localhost:5000/api/student/check-submission/${userId}/${examId}`);
        if (res.data.submitted) {
          setAlreadySubmitted(true);
          return;
        }

        const examRes = await axios.get(`http://localhost:5000/api/exams/${examId}`);
        setQuestions(examRes.data.questions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExam();
  }, [examId, userId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/student/submit-exam", {
        studentId: userId,
        examId,
        answers,
      });

      alert("Exam submitted successfully!");
      navigate("/result");
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response?.data?.error === "You have already submitted this exam") {
        alert("You have already submitted this exam.");
      } else {
        alert("There was an error submitting the exam.");
      }
    }
  };

  return (
    <div className="exam-container">
      {alreadySubmitted ? (
        <div className="already-submitted">
          <h2>You have already submitted this exam.</h2>
        </div>
      ) : (
        <>
          <h2>Questions</h2>
          <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
              <div key={q._id} className="question-block">
                <p>{index + 1}. {q.question}</p>
                {q.options.map((option, i) => (
                  <label key={i} className="option">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={option}
                      checked={answers[q._id] === option}
                      onChange={() => handleOptionChange(q._id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Attend;
