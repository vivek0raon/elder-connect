import "./auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitProfile = async () => {
    try {
      const res = await axios.put(
        `/api/auth/complete-profile/${user._id}`,
        form
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile Completed ✅");

      if (res.data.role === "caretaker") {
        navigate("/caretaker-dashboard");
      } else {
        navigate("/child-dashboard");
      }

    } catch (err) {
      console.log(err);
      alert("Failed ❌");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-glass">

        <div className="auth-right">

          <h1>Complete Profile</h1>

          {/* CARETAKER */}
          {user.role === "caretaker" ? (
            <>
              <input
                name="aadhar"
                placeholder="Aadhar Number"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="pastWork"
                placeholder="Past Work Experience"
                className="auth-input"
                onChange={handleChange}
              />

              <select
                name="criminalRecord"
                className="auth-input"
                onChange={handleChange}
              >
                <option value="">
                  Criminal Record?
                </option>

                <option value="No">
                  No
                </option>

                <option value="Yes">
                  Yes
                </option>
              </select>
            </>
          ) : (
            <>
              <input
                name="job"
                placeholder="Job"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Your Address"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="parentAddress"
                placeholder="Parent Address"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="auth-input"
                onChange={handleChange}
              />

              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                className="auth-input"
                onChange={handleChange}
              />

              <textarea
                name="notes"
                placeholder="Medical Notes / Special Needs"
                className="auth-input"
                onChange={handleChange}
              />
            </>
          )}

          <button
            className="auth-button"
            onClick={submitProfile}
          >
            Save Profile
          </button>

        </div>

      </div>
    </div>
  );
};

export default CompleteProfile;