import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import ViewAttendance from "./ViewAttendance";          // Faculty
import AttendanceChart from "./AttendanceChart";        // Student
import StudentDashboard from "./StudentDashboard";
import FacultyDashboard from "./FacultyDashboard";
import AdminDashboard from "./AdminDashboard";
import StudentLogin from "./StudentLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        {/* Faculty Attendance */}
        <Route path="/faculty-attendance" element={<ViewAttendance />} />

        {/* Student Attendance */}
        <Route path="/attendance" element={<AttendanceChart />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Student Login */}
        <Route path="/student-login" element={<StudentLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
