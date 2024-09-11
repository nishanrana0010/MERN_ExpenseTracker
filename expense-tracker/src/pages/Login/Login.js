import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios with `npm install axios`
import "./Login.css"; // Make sure to have your CSS file in the same directory or adjust the path

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Assuming the response contains a token
        localStorage.setItem("authToken", response.data.token);
        alert("Login successful");
        navigate("/dashboard"); // Redirect to the dashboard or main page
      }
    } catch (error) {
      alert("Invalid username or password"); // Set error message
    }
  };

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById("password");
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
  };

  return (
    <div className="Login-main">
      <div className="login-container">
        <div className="left-login">
          <h2 style={{ paddingBottom: "1rem", fontSize: "2.5rem" }}>Login</h2>
          <form className="form" id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                title="Password must contain at least one number, one uppercase letter, and one special character"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                id="togglePassword"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                &#128065;
              </span>
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Display error */}
            <input className="login" type="submit" value="Login" />
          </form>
          <div className="forgot-password">
            <label className="checkbox-label" htmlFor="checkbox">
              <input type="checkbox" name="remember" id="checkbox" /> Remember
              Me
            </label>
            <p>
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                Forgot Password?
              </a>
            </p>
          </div>
        </div>

        <div className="right-login">
          <h1>Welcome to login</h1>
          <p>Don't have an Account?</p>
          <button>
            <a href="/register" style={{ textDecoration: "none" }}>
              Register
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
