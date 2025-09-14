import React from "react";
import "./App.css"; // reuse the same professional CSS

function StudentDashboard({ studentId }) {
  const handleMarkAttendance = () => {
    alert(`Attendance marked for student ID: ${studentId}`);
    // Here you can add API call to backend to save attendance
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1>Student Dashboard</h1>
        <h2>Welcome, {studentId}</h2>

        <p style={{ marginBottom: "1.5rem", color: "#374151" }}>
          Click the button below to mark your attendance.
        </p>

        <button
          className="auth-submit"
          onClick={handleMarkAttendance}
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
