import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Edit.css";
const ExamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/exams/${id}`);
        setExam(res.data);
      } catch (err) {
        console.error("Failed to fetch exam details:", err);
      }
    };

    fetchExam();
  }, [id]);

  if (!exam) return <p>Loading exam details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{exam.title}</h2>
        <button
          onClick={() => navigate(`/exam/${id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Exam
        </button>
      </div>

      <p className="mb-4 text-lg">
        <strong>Status:</strong> {exam.status}
      </p>

      <h3 className="text-xl font-semibold mb-2">Questions:</h3>
      {exam.questions.length === 0 ? (
        <p>No questions added.</p>
      ) : (
        <ul className="space-y-4">
          {exam.questions.map((q, idx) => (
            <li key={idx} className="bg-gray-100 p-4 rounded shadow">
              <p className="font-semibold">
                Q{idx + 1}: {q.question}
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                {q.options.map((opt, oIdx) => (
                  <li key={oIdx}>{opt}</li>
                ))}
              </ul>
              <p className="mt-2 text-green-600">
                Correct Answer: {q.correctAnswer}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamDetails;
