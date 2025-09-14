import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart = () => {
  const [studentId, setStudentId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchAttendance = async () => {
    if (!studentId.trim()) {
      setError("Please enter a student ID.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await axios.post("http://localhost:5000/api/students/view-attendance", {
        student_id: studentId,
      });
      if (response.data.status === "true") {
        setAttendance(response.data.attendance);
      } else {
        setError(response.data.message || "Attendance not found.");
        setAttendance([]);
      }
    } catch (err) {
      setError("Error fetching attendance data.");
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    if (!studentId.trim()) {
      setError("Please enter a student ID.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await axios.post("http://localhost:5000/api/student/mark-attendance", {
        student_id: studentId,
      });
      if (response.data.status === "true") {
        setSuccessMessage(response.data.message || "Attendance marked successfully.");
      } else {
        setError(response.data.message || "Failed to mark attendance.");
      }
    } catch (err) {
      setError("Error marking attendance.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total attendance percentage
  const totalClasses = attendance.reduce((sum, record) => sum + record.total_no_of_classes, 0);
  const totalAttended = attendance.reduce((sum, record) => sum + record.total_no_of_attended, 0);
  const totalPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(2) : "0.00";

  // Prepare chart data
  const labels = attendance.map(record => record.subject);
  const totalClassesData = attendance.map(record => record.total_no_of_classes);
  const attendedClassesData = attendance.map(record => record.total_no_of_attended);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Classes',
        data: totalClassesData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Classes Attended',
        data: attendedClassesData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Attendance Overview',
      },
    },
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>Student Attendance</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <button onClick={fetchAttendance} style={{ padding: "8px 16px", marginRight: "10px" }}>
          View Attendance
        </button>
        <button onClick={markAttendance} style={{ padding: "8px 16px" }}>
          Mark Attendance
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {attendance.length > 0 && (
        <div>
          <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Total Attendance Percentage: {totalPercentage}%
          </div>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
    
  );
};

export default AttendanceChart;