import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authStyles } from "../styles";

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
    <div className={authStyles.page}>
      <div className={authStyles.panel}>

        <div className={`${authStyles.right} mx-auto max-w-xl`}>

          <h1 className={authStyles.title}>Complete Profile</h1>

          {/* CARETAKER */}
          {user.role === "caretaker" ? (
            <>
              <input
                name="aadhar"
                placeholder="Aadhar Number"
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="pastWork"
                placeholder="Past Work Experience"
                className={authStyles.input}
                onChange={handleChange}
              />

              <select
                name="criminalRecord"
                className={authStyles.input}
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
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Your Address"
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="parentAddress"
                placeholder="Parent Address"
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City"
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className={authStyles.input}
                onChange={handleChange}
              />

              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                className={authStyles.input}
                onChange={handleChange}
              />

              <textarea
                name="notes"
                placeholder="Medical Notes / Special Needs"
                className={authStyles.input}
                onChange={handleChange}
              />
            </>
          )}

          <button
            className={authStyles.button}
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
