import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { authStyles } from "../styles";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= HANDLE REGISTER ================= */
  const handleRegister = async () => {
    try {

      const res = await axios.post(
        "/api/auth/register",
        form
      );

      console.log(res.data);

      alert("Registered Successfully ✅");

      // ⭐ redirect to login
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div className={authStyles.page}>
      <div className={authStyles.panel}>

        {/* LEFT */}
        <div className={authStyles.left}>
          <img src={logo} alt="ElderCare Connect" className={authStyles.logo} />
          <h3 className="text-2xl font-semibold leading-snug">Connecting families with trusted elder care services.</h3>
        </div>

        {/* RIGHT */}
        <div className={authStyles.right}>
          <h1 className={authStyles.title}>Create Your Account</h1>
          <p className={authStyles.subtitle}>Sign up to get started with ElderCare Connect</p>

          <input
            className={authStyles.input}
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
          />

          <input
            className={authStyles.input}
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            className={authStyles.input}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <select
            className={authStyles.input}
            name="role"
            onChange={handleChange}
          >
            <option value="">Select role</option>
            <option value="caretaker">Caretaker</option>
            <option value="child">Family Member</option>
          </select>

          <button className={authStyles.button} onClick={handleRegister}>
            Sign Up
          </button>

          <div className={authStyles.link}>
            Already have an account?{" "}
            <Link to="/login"><span className={authStyles.linkAccent}>Log In</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
