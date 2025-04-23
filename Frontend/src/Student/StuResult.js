import { useEffect, useState } from "react";
import axios from "axios";
import "./StuResults.css";

const Result = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = user?.id;

    if (!studentId) {
      console.error("Student ID not found.");
      return;
    }

    axios.get(`http://localhost:5000/api/results/student/${studentId}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log("Error fetching results:", err));
  }, []);

  return (
    <div className="result-container">
      <h2>Exam Results</h2>
      <table className="result-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Status</th>
            <th>No. of Students</th>
            <th>Your Rank</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr><td colSpan="4">No results available</td></tr>
          ) : (
            results.map((result, index) => (
              <tr key={index}>
                <td>{result.testName}</td>
                <td>{result.status}</td>
                <td>{result.studentCount}</td>
                <td>{result.rank}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
