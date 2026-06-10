import "./dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Emergency = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    caretakerId: "",
    location: "",
    message: "",
    contact: "",
    urgency: ""
  });

  const [caretakers, setCaretakers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= FETCH CARETAKERS ================= */
  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const res = await axios.get(
          "/api/users/caretakers"
        );
        setCaretakers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCaretakers();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {

      if (!form.type || !form.location || !form.urgency) {
        alert("Please fill required fields");
        return;
      }

      await axios.post("/api/emergency/create", {
        ...form,
        userId: user._id
      });

      alert("Emergency Alert Sent 🚨");

      setForm({
        type: "",
        caretakerId: "",
        location: "",
        message: "",
        contact: "",
        urgency: ""
      });

    } catch (err) {
      console.log(err);
      alert("Failed ❌");
    }
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="brand">Nest Life:CURA</h2>

        <ul>
          <li onClick={() => navigate("/child-dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/book-service")}>Book Service</li>
          <li onClick={() => navigate("/complaints")}>Complaints</li>
          <li className="active">Emergency</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="dashboard-main">

        <h1>Emergency</h1>

        <div className="dashboard-grid">

          {/* LEFT */}
          <div className="dashboard-left">

            <div className="card-box">
              <h3>Emergency Details</h3>

              {/* TYPE */}
              <label>Emergency Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="">Select</option>
                <option value="medical">Medical</option>
                <option value="fall">Fall</option>
                <option value="safety">Safety Issue</option>
                <option value="other">Other</option>
              </select>

              {/* CARETAKER */}
              <label>Select Caretaker (if related)</label>
              <select
                name="caretakerId"
                value={form.caretakerId}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="">Optional</option>
                {caretakers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* LOCATION */}
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter current location"
                className="profile-input"
              />

              {/* URGENCY */}
              <label>How urgent is the situation?</label>
              <select
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="">Select</option>
                <option value="low">Not urgent</option>
                <option value="medium">Need help soon</option>
                <option value="high">Immediate help needed</option>
              </select>

              {/* CONTACT */}
              <label>Emergency Contact</label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="profile-input"
              />

              {/* MESSAGE */}
              <label>Description</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe the emergency"
                className="profile-input"
              />

              <button
                onClick={handleSubmit}
                className="btn-save"
                style={{ background: "#d9534f" }} // red button
              >
                Send Emergency Alert
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="dashboard-right">

            <div className="card-box">
              <h3>Instructions</h3>
              <p>Select correct emergency type.</p>
              <p>Provide exact location.</p>
              <p>Submit immediately in urgent cases.</p>
            </div>

            <div className="card-box">
              <h3>Urgency Guide</h3>
              <p>Not urgent – Minor issue</p>
              <p>Need help soon – Attention needed</p>
              <p>Immediate help needed – Critical</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Emergency;