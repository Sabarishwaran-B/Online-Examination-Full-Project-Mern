import "./Table.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Table = ({ title }) => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/exams");
        setExams(res.data.exams);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="table-container">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Instructor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.name}</td>
              <td>{exam.instructor}</td>
              <td>{exam.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
