import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manage Students */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/add-student" className="text-blue-600 hover:underline">
                ➕ Add Student
              </Link>
            </li>
            <li>
              <Link
                to="/view-students"
                className="text-blue-600 hover:underline"
              >
                📋 View Students
              </Link>
            </li>
          </ul>
        </div>

        {/* Manage Faculty */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Faculty</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/add-faculty" className="text-blue-600 hover:underline">
                ➕ Add Faculty
              </Link>
            </li>
            <li>
              <Link
                to="/view-faculty"
                className="text-blue-600 hover:underline"
              >
                📋 View Faculty
              </Link>
            </li>
          </ul>
        </div>

        {/* Attendance Reports */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Attendance</h2>
          <Link to="/attendance" className="text-blue-600 hover:underline">
            📊 View Attendance Reports
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
