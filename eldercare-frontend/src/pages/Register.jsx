// import "./auth.css";
// import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";

// const Register = () => {
//   return (
//     <div className="auth-bg">
//       <div className="auth-glass">
//         {/* LEFT */}
//         <div className="auth-left">
//           <img src={logo} alt="ElderCare Connect" />
//           <h3>Connecting families with trusted elder care services.</h3>
//         </div>

//         {/* RIGHT */}
//         <div className="auth-right">
//           <h1>Create Your Account</h1>
//           <p>Sign up to get started with ElderCare Connect</p>

//           <input className="auth-input" placeholder="Full Name" />
//           <input className="auth-input" placeholder="Email" />
//           <input className="auth-input" type="password" placeholder="Password" />

//           <select className="auth-input">
//             <option>Select role</option>
//             <option>Caretaker</option>
//             <option>Family Member</option>
//           </select>

//           <button className="auth-button">Sign Up</button>

//           <div className="auth-link">
//             Already have an account? <Link to="/login"><span>Log In</span></Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import "./auth.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    <div className="auth-bg">
      <div className="auth-glass">

        {/* LEFT */}
        <div className="auth-left">
          <img src={logo} alt="ElderCare Connect" />
          <h3>Connecting families with trusted elder care services.</h3>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <h1>Create Your Account</h1>
          <p>Sign up to get started with ElderCare Connect</p>

          <input
            className="auth-input"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
          />

          <input
            className="auth-input"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <select
            className="auth-input"
            name="role"
            onChange={handleChange}
          >
            <option value="">Select role</option>
            <option value="caretaker">Caretaker</option>
            <option value="child">Family Member</option>
          </select>

          <button className="auth-button" onClick={handleRegister}>
            Sign Up
          </button>

          <div className="auth-link">
            Already have an account?{" "}
            <Link to="/login"><span>Log In</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;