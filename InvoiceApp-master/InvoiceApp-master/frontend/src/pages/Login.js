import React, { useState } from "react";
import { FiMail, FiKey } from "react-icons/fi";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const { username, password } = formData;

        const res = await axios.post("http://localhost:8070/auth/login", {
          username,
          password,
        });

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          window.location.href = "/";
        } else {
          setErrors({ submit: "Invalid response from server" });
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response) {
          setErrors({
            submit:
              error.response.data.error ||
              "Invalid credentials. Please try again.",
          });
        } else {
          setErrors({
            submit: "Unable to connect to the server. Please try again later.",
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const backgroundStyle = {
    position: "relative",

    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  };

  const formStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    zIndex: 2,
    position: "relative",
  };

  const inputStyle = {
    padding: "12px 15px",
    borderRadius: "8px",
    border:
      errors.username || errors.password
        ? "1px solid #dc3545"
        : "1px solid #ced4da",
    transition: "all 0.3s ease",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#007EA4",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const titleStyle = {
    color: "#007EA4",
    fontWeight: "700",
    marginBottom: "1.5rem",
    textAlign: "center",
    fontSize: "1.8rem",
  };

  const buttonStyle = {
    backgroundColor: "#007EA4",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#006494",
      transform: "translateY(-2px)",
    },
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h3 style={titleStyle}>Admin Login</h3>

        <div className="mb-3">
          <label style={labelStyle}>
            <FiMail size={18} /> Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter your username"
          />
          {errors.username && (
            <div className="text-danger mt-1">{errors.username}</div>
          )}
        </div>

        <div className="mb-4">
          <label style={labelStyle}>
            <FiKey size={18} /> Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-danger mt-1">{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={buttonStyle}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
        {errors.submit && (
          <div className="text-danger mt-3 text-center">{errors.submit}</div>
        )}
      </form>
    </div>
  );
};

export default Login;
