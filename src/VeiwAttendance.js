import React, { useState, useEffect } from "react";

function ViewAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // 👇 Replace this with your real backend API
        const response = await fetch("http://localhost:5000/api/faculty/attendance");
        if (!response.ok) {
          throw new Error("Failed to fetch attendance");
        }
        const data = await response.json();
        setAttendance(data); // Expecting array of attendance records
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <h2>Loading attendance...</h2>;
  if (error) return <h2 style={{ color: "red" }}>Error: {error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Faculty - View Attendance</h1>
      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={index}>
                <td>{record.studentId}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAttendance;
