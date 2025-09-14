import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentLogin() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/student/login", {
        studentId,
        password,
      });

      if (res.data.success) {
        alert("Login successful!");
        navigate("/student-dashboard", { state: { studentId } }); // ✅ send ID to dashboard
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1>Student Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth-submit" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
