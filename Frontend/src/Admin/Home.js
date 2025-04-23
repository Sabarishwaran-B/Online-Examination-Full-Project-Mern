import { useEffect, useState } from "react";
import Table from "./HomeTab";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navi = useNavigate();
  const [instructorCount, setInstructorCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [instructorsRes, studentsRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/instructors"),
          fetch("http://localhost:5000/api/admin/students")
        ]);

        const instructorsData = await instructorsRes.json();
        const studentsData = await studentsRes.json();

        if (Array.isArray(instructorsData.users)) {
          setInstructorCount(instructorsData.users.length);
        }

        if (Array.isArray(studentsData.users)) {
          setStudentCount(studentsData.users.length);
        }
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="home">
      <div className="cards">
        <div className="card" onClick={() => navi("/users")}>
          <h3>Instructor</h3>
          <p>{instructorCount}</p>
        </div>
        <div className="card" onClick={() => navi("/users")}>
          <h3>Student</h3>
          <p>{studentCount}</p>
        </div>
      </div>
      <Table title="List of Exams" />
    </div>
  );
};

export default Home;
