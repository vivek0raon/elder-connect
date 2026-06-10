import "./dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Complaints = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    caretakerId: "",
    subject: "",
    message: "",
    severity: "",
    incidentDate: ""
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

      if (!form.type || !form.subject || !form.message) {
        alert("Please fill required fields");
        return;
      }

      await axios.post("/api/complaints/create", {
        ...form,
        userId: user._id
      });

      alert("Complaint submitted ✅");

      setForm({
        type: "",
        caretakerId: "",
        subject: "",
        message: "",
        severity: "",
        incidentDate: ""
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
          <li className="active">Complaints</li>
          <li onClick={() => navigate("/emergency")}>Emergency</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="dashboard-main">

        <h1>Raise Complaint</h1>

        <div className="dashboard-grid">

          {/* LEFT */}
          <div className="dashboard-left">

            <div className="card-box">
              <h3>Complaint Details</h3>

              {/* TYPE */}
              <label>Complaint Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="">Select</option>
                <option value="caretaker">Caretaker</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>

              {/* CARETAKER */}
              {form.type === "caretaker" && (
                <>
                  <label>Select Caretaker</label>
                  <select
                    name="caretakerId"
                    value={form.caretakerId}
                    onChange={handleChange}
                    className="profile-input"
                  >
                    <option value="">Select</option>
                    {caretakers.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {/* 🔥 UPDATED LABEL */}
              <label>How urgent is your problem?</label>
              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="">Select</option>
                <option value="low">Not urgent</option>
                <option value="medium">Need help soon</option>
                <option value="high">Immediate help needed</option>
              </select>

              {/* DATE */}
              <label>Date of Incident</label>
              <input
                type="date"
                name="incidentDate"
                value={form.incidentDate}
                onChange={handleChange}
                className="profile-input"
              />

              {/* SUBJECT */}
              <label>Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="profile-input"
              />

              {/* MESSAGE */}
              <label>Description</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your issue"
                className="profile-input"
              />

              <button onClick={handleSubmit} className="btn-save">
                Submit Complaint
              </button>
            </div>

          </div>

          {/* RIGHT */}
          <div className="dashboard-right">

            <div className="card-box">
              <h3>Instructions</h3>
              <p>Select correct complaint type.</p>
              <p>Provide clear and honest details.</p>
              <p>Mention when the issue happened.</p>
            </div>

            <div className="card-box">
              <h3>Urgency Guide</h3>
              <p>Not urgent – Minor issue</p>
              <p>Need help soon – Should be checked</p>
              <p>Immediate help needed – Serious problem</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Complaints;