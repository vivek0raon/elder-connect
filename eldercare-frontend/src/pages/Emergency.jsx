import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dashboardStyles } from "../styles";

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
    <div className={dashboardStyles.layout}>

      {/* SIDEBAR */}
      <div className={dashboardStyles.sidebar}>
        <h2 className={dashboardStyles.brand}>Nest Life:CURA</h2>

        <ul className={dashboardStyles.navList}>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/child-dashboard")}>Dashboard</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/book-service")}>Book Service</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/complaints")}>Complaints</li>
          <li className={dashboardStyles.activeNavItem}>Emergency</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className={dashboardStyles.main}>

        <h1 className={dashboardStyles.pageTitle}>Emergency</h1>

        <div className={dashboardStyles.grid}>

          {/* LEFT */}
          <div className={dashboardStyles.left}>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Emergency Details</h3>

              {/* TYPE */}
              <label className={dashboardStyles.label}>Emergency Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={dashboardStyles.input}
              >
                <option value="">Select</option>
                <option value="medical">Medical</option>
                <option value="fall">Fall</option>
                <option value="safety">Safety Issue</option>
                <option value="other">Other</option>
              </select>

              {/* CARETAKER */}
              <label className={dashboardStyles.label}>Select Caretaker (if related)</label>
              <select
                name="caretakerId"
                value={form.caretakerId}
                onChange={handleChange}
                className={dashboardStyles.input}
              >
                <option value="">Optional</option>
                {caretakers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* LOCATION */}
              <label className={dashboardStyles.label}>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter current location"
                className={dashboardStyles.input}
              />

              {/* URGENCY */}
              <label className={dashboardStyles.label}>How urgent is the situation?</label>
              <select
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className={dashboardStyles.input}
              >
                <option value="">Select</option>
                <option value="low">Not urgent</option>
                <option value="medium">Need help soon</option>
                <option value="high">Immediate help needed</option>
              </select>

              {/* CONTACT */}
              <label className={dashboardStyles.label}>Emergency Contact</label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                className={dashboardStyles.input}
              />

              {/* MESSAGE */}
              <label className={dashboardStyles.label}>Description</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe the emergency"
                className={dashboardStyles.input}
              />

              <button
                onClick={handleSubmit}
                className={dashboardStyles.dangerButton}
              >
                Send Emergency Alert
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className={dashboardStyles.right}>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Instructions</h3>
              <p>Select correct emergency type.</p>
              <p>Provide exact location.</p>
              <p>Submit immediately in urgent cases.</p>
            </div>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Urgency Guide</h3>
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
