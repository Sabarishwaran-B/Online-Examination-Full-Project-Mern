import React, { useEffect, useState } from "react";
import "./Result.css";
import axios from "axios";

const Result = () => {
  const [results, setResults] = useState([]);
  const [rankedList, setRankedList] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
  
        try {
          const res = await axios.get(`http://localhost:5000/api/results/instructor/${parsedUser.id}`);
          setResults(res.data);
        } catch (err) {
          console.error("Error fetching results:", err);
        }
      }
    };
  
    fetchResults();
  }, []);
  

  const handleView = async (examId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/results/${examId}`);
      setRankedList(res.data);
    } catch (err) {
      console.error("Error fetching ranked result:", err);
    }
  };

  return (
    <div className="result-container">
      <h2 className="a">Exam Results</h2>
      <table className="result-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Status</th>
            <th>No. of Students</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.test}</td>
              <td>{result.status}</td>
              <td>{result.students}</td>
              <td>
                <button className="viewbutton" onClick={() => handleView(result.examId)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rankedList.length > 0 && (
        <div className="ranked-section">
          <h3>Ranked Students</h3>
          <table className="ranked-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Score</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {rankedList.map((r, i) => (
                <tr key={i}>
                  <td>{r.rank}</td>
                  <td>{r.student}</td>
                  <td>{r.score}</td>
                  <td>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Result;
