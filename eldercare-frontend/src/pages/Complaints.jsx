import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dashboardStyles } from "../styles";

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
    <div className={dashboardStyles.layout}>

      {/* SIDEBAR */}
      <div className={dashboardStyles.sidebar}>
        <h2 className={dashboardStyles.brand}>Nest Life:CURA</h2>

        <ul className={dashboardStyles.navList}>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/child-dashboard")}>Dashboard</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/book-service")}>Book Service</li>
          <li className={dashboardStyles.activeNavItem}>Complaints</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/emergency")}>Emergency</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className={dashboardStyles.main}>

        <h1 className={dashboardStyles.pageTitle}>Raise Complaint</h1>

        <div className={dashboardStyles.grid}>

          {/* LEFT */}
          <div className={dashboardStyles.left}>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Complaint Details</h3>

              {/* TYPE */}
              <label className={dashboardStyles.label}>Complaint Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={dashboardStyles.input}
              >
                <option value="">Select</option>
                <option value="caretaker">Caretaker</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>

              {/* CARETAKER */}
              {form.type === "caretaker" && (
                <>
                  <label className={dashboardStyles.label}>Select Caretaker</label>
                  <select
                    name="caretakerId"
                    value={form.caretakerId}
                    onChange={handleChange}
                    className={dashboardStyles.input}
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
              <label className={dashboardStyles.label}>How urgent is your problem?</label>
              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
                className={dashboardStyles.input}
              >
                <option value="">Select</option>
                <option value="low">Not urgent</option>
                <option value="medium">Need help soon</option>
                <option value="high">Immediate help needed</option>
              </select>

              {/* DATE */}
              <label className={dashboardStyles.label}>Date of Incident</label>
              <input
                type="date"
                name="incidentDate"
                value={form.incidentDate}
                onChange={handleChange}
                className={dashboardStyles.input}
              />

              {/* SUBJECT */}
              <label className={dashboardStyles.label}>Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className={dashboardStyles.input}
              />

              {/* MESSAGE */}
              <label className={dashboardStyles.label}>Description</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your issue"
                className={dashboardStyles.input}
              />

              <button onClick={handleSubmit} className={dashboardStyles.saveButton}>
                Submit Complaint
              </button>
            </div>

          </div>

          {/* RIGHT */}
          <div className={dashboardStyles.right}>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Instructions</h3>
              <p>Select correct complaint type.</p>
              <p>Provide clear and honest details.</p>
              <p>Mention when the issue happened.</p>
            </div>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Urgency Guide</h3>
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
