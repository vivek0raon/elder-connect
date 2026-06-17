
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dashboardStyles } from "../styles";

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
    <div className={dashboardStyles.layout}>

      {/* SIDEBAR */}
      <div className={dashboardStyles.sidebar}>
        <h2 className={dashboardStyles.brand}>Nest Life:CURA</h2>

        <ul className={dashboardStyles.navList}>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/child-dashboard")}>Dashboard</li>
          <li className={dashboardStyles.activeNavItem}>Book Service</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/complaints")}>Complaints</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/emergency")}>Emergency</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className={dashboardStyles.main}>

        <h1 className={dashboardStyles.pageTitle}>Book Caretaker</h1>

        <div className={dashboardStyles.grid}>

          {/* LEFT */}
          <div className={dashboardStyles.left}>

            {/* BOOKING FORM */}
            <div className={dashboardStyles.card}>

              <h3 className={dashboardStyles.cardTitle}>Booking Details</h3>

              <label className={dashboardStyles.label}>Select Caretaker</label>
              <select
                name="caretakerId"
                onChange={handleChange}
                className={dashboardStyles.input}
              >
                <option value="">Select</option>

                {caretakers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name || c.email}
                  </option>
                ))}
              </select>

              <label className={dashboardStyles.label}>Service</label>
              <input
                name="service"
                placeholder="Enter Service"
                onChange={handleChange}
                className={dashboardStyles.input}
              />

              <label className={dashboardStyles.label}>From Date</label>
              <input
                name="fromDate"
                type="date"
                onChange={handleChange}
                className={dashboardStyles.input}
              />

              <label className={dashboardStyles.label}>To Date</label>
              <input
                name="toDate"
                type="date"
                min={form.fromDate}
                onChange={handleChange}
                className={dashboardStyles.input}
              />

              <button onClick={handleSubmit} className={dashboardStyles.saveButton}>
                Confirm Booking
              </button>

            </div>

            {/* ✅ CARETAKER DETAILS PREVIEW */}
            {selectedCaretaker && (
              <div className={dashboardStyles.card}>
                <h3 className={dashboardStyles.cardTitle}>Selected Caretaker Details</h3>

                <h3 className="mb-1.5 mt-0 text-lg font-semibold">
                  {selectedCaretaker.name || "No Name"}
                </h3>

                <ul className="m-0 pl-[18px] text-[17px]">
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
          <div className={dashboardStyles.right}>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Instructions</h3>
              <p>Select a caretaker and service.</p>
              <p>Choose a preferred date range.</p>
              <p>Click confirm to book.</p>
            </div>

            <div className={dashboardStyles.card}>
              <h3 className={dashboardStyles.cardTitle}>Tips</h3>
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
