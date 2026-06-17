import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { authStyles } from "../styles";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE LOGIN ================= */
  const handleLogin = async () => {
    if (!form.email.trim() || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "/api/auth/login",
        {
          email: form.email.trim(),
          password: form.password,
        }
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
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className={authStyles.page}>
      <div className={authStyles.panel}>

        {/* LEFT SIDE */}
        <div className={authStyles.left}>
          <img src={logo} alt="ElderCare Connect" className={authStyles.logo} />
          <h3 className="text-2xl font-semibold leading-snug">
            Connecting families with trusted elder care
            services.
          </h3>
        </div>

        {/* RIGHT SIDE */}
        <div className={authStyles.right}>

          <h1 className={authStyles.title}>Welcome Back</h1>
          <p className={authStyles.subtitle}>Please log in to your account</p>

          <input
            className={authStyles.input}
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className={authStyles.input}
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {error && (
            <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div
            className="mb-3.5 cursor-pointer text-right text-sm text-[#8fae8e]"
          >
            Forgot password?
          </div>

          <button
            className={authStyles.button}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className={authStyles.link}>
            Don't have an account?{" "}
            <Link to="/register">
              <span className={authStyles.linkAccent}>Sign Up</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
