import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure your App.css has the panel styling

function AuthPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clear fields when component mounts (prevents autofill)
  useEffect(() => {
    setId("");
    setEmail("");
    setPassword("");
  }, []);

  // Clear inputs when role is selected
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setId("");
    setEmail("");
    setPassword("");
  };

  // Toggle login/signup and clear inputs
  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
    setId("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isLogin ? "Login" : "Sign Up"} as ${selectedRole} with ID: ${id}, Email: ${email}`);
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1>Smart Attendance</h1>

        {/* Step 1: Choose Role */}
        {!selectedRole && (
          <div>
            <h2>Select Your Role</h2>
            <button
              className="role-button student"
              onClick={() => handleRoleSelect("student")}
            >
              Student
            </button>
            <button
              className="role-button faculty"
              onClick={() => handleRoleSelect("faculty")}
            >
              Faculty
            </button>
            <button
              className="role-button admin"
              onClick={() => handleRoleSelect("admin")}
            >
              Admin
            </button>
          </div>
        )}

        {/* Step 2: Show Login/Signup Form */}
        {selectedRole && (
          <div>
            <h2>{isLogin ? "Login" : "Sign Up"} as {selectedRole}</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Hidden dummy fields to prevent browser autofill */}
              <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
              <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

              <input
                type="text"
                placeholder="Enter ID"
                className="auth-input"
                value={id}
                onChange={(e) => setId(e.target.value)}
                name="user-id-unique-field"
                autoComplete="off"
                required
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email-unique-field"
                autoComplete="new-email"
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password-unique-field"
                autoComplete="new-password"
                required
              />

              <button type="submit" className="auth-submit">
                {isLogin ? "Login" : "Sign Up"}
              </button>
               {isLogin && (
  <p
    className="forgot-password-link"
    onClick={() => alert("Password reset link sent to your email")}
  >
    Forgot Password?
  </p>
)}
            </form>

            {/* Toggle Login/Signup */}
            <p className="toggle-link" onClick={toggleLoginSignup}>
              {isLogin ? "New user? Sign Up" : "Already have an account? Login"}
            </p>

            {/* Back to Role Selection */}
            <p className="back-link" onClick={() => setSelectedRole(null)}>
              ← Back to Role Selection
            </p>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default AuthPage;
