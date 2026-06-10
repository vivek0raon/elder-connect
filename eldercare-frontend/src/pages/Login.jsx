import "./auth.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE LOGIN ================= */
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        form
      );

      const user = res.data.user;

      // Save user + token
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      // Profile not completed
      if (!user.profileCompleted) {
        navigate("/complete-profile");
        return;
      }

      // Role based navigation
      if (user.role === "caretaker") {
        navigate("/caretaker-dashboard");
      } else {
        navigate("/child-dashboard");
      }

    } catch (err) {
      console.log(err);
      alert("Login Failed ❌");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="auth-bg">
      <div className="auth-glass">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <img src={logo} alt="ElderCare Connect" />
          <h3>
            Connecting families with trusted elder care
            services.
          </h3>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">

          <h1>Welcome Back</h1>
          <p>Please log in to your account</p>

          <input
            className="auth-input"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <div
            style={{
              textAlign: "right",
              color: "#8fae8e",
              marginBottom: "14px",
              cursor: "pointer",
            }}
          >
            Forgot password?
          </div>

          <button
            className="auth-button"
            onClick={handleLogin}
          >
            Log In
          </button>

          <div className="auth-link">
            Don't have an account?{" "}
            <Link to="/register">
              <span>Sign Up</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;