
import { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const BookService = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    caretakerId: "",
    service: "",
    fromDate: "",
    toDate: ""
  });

  const [caretakers, setCaretakers] = useState([]);

  // ✅ ADD THIS (missing in your code)
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);

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
        console.log("Error fetching caretakers:", err);
      }
    };

    fetchCaretakers();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    // ✅ detect caretaker selection
    if (name === "caretakerId") {
      const selected = caretakers.find((c) => c._id === value);
      setSelectedCaretaker(selected);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {

      if (!form.caretakerId || !form.service || !form.fromDate || !form.toDate) {
        alert("Please fill all fields");
        return;
      }

      if (form.toDate < form.fromDate) {
        alert("To Date cannot be before From Date");
        return;
      }

      await axios.post("/api/bookings/create", {
        ...form,
        childId: user._id
      });

      alert("Booking Created ✅");

      navigate("/child-dashboard");

    } catch (err) {
      console.log(err);
      alert("Booking failed ❌");
    }
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="brand">Nest Life:CURA</h2>

        <ul>
          <li onClick={() => navigate("/child-dashboard")}>Dashboard</li>
          <li className="active">Book Service</li>
          <li onClick={() => navigate("/complaints")}>Complaints</li>
          <li onClick={() => navigate("/emergency")}>Emergency</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="dashboard-main">

        <h1>Book Caretaker</h1>

        <div className="dashboard-grid">

          {/* LEFT */}
          <div className="dashboard-left">

            {/* BOOKING FORM */}
            <div className="card-box">

              <h3>Booking Details</h3>

              <label>Select Caretaker</label>
              <select
                name="caretakerId"
                onChange={handleChange}
                className="profile-input"
              >
                <option value="">Select</option>

                {caretakers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name || c.email}
                  </option>
                ))}
              </select>

              <label>Service</label>
              <input
                name="service"
                placeholder="Enter Service"
                onChange={handleChange}
                className="profile-input"
              />

              <label>From Date</label>
              <input
                name="fromDate"
                type="date"
                onChange={handleChange}
                className="profile-input"
              />

              <label>To Date</label>
              <input
                name="toDate"
                type="date"
                min={form.fromDate}
                onChange={handleChange}
                className="profile-input"
              />

              <button onClick={handleSubmit} className="btn-save">
                Confirm Booking
              </button>

            </div>

            {/* ✅ CARETAKER DETAILS PREVIEW */}
            {selectedCaretaker && (
              <div className="card-box" style={{ marginTop: "0px" }}>
                <h3>Selected Caretaker Details</h3>

                <h3 style={{ margin: "0 0 6px 0" }}>
                  {selectedCaretaker.name || "No Name"}
                </h3>

                <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "17px" }}>
                  <li>Email: {selectedCaretaker.email || "N/A"}</li>
                  <li>Mobile: {selectedCaretaker.phone || "N/A"}</li>
                  <li>Aadhar: {selectedCaretaker.aadhar || "N/A"}</li>
                  <li>Location: {selectedCaretaker.location || "N/A"}</li>
                  <li>
                    Criminal Record: {selectedCaretaker.criminalRecord || "Clear"}
                  </li>
                  <li>Past Work: {selectedCaretaker.pastWork || "N/A"}</li>
                </ul>
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="dashboard-right">

            <div className="card-box">
              <h3>Instructions</h3>
              <p>Select a caretaker and service.</p>
              <p>Choose a preferred date range.</p>
              <p>Click confirm to book.</p>
            </div>

            <div className="card-box">
              <h3>Tips</h3>
              <p>Choose verified caretakers</p>
              <p>Book in advance</p>
              <p>Check availability</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookService;