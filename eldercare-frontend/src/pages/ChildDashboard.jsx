
import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChildDashboard = () => {

  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [stats, setStats] = useState({
    bookings: 0,
    caretakers: 0,
    complaints: 0,
    emergency: 0
  });

  const [recentRequests, setRecentRequests] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [caretakers, setCaretakers] = useState([]);

  /* ================= FETCH FUNCTION ================= */
  const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      /* DASHBOARD DATA */
      const res = await axios.get(
        `/api/dashboard/child/${user._id}`
      );

      setStats(res.data.stats || {});
      setRecentRequests(res.data.recentRequests || []);
      setAlerts(res.data.alerts || []);
      setComplaints(res.data.complaints || []);

      /* CARETAKERS */
      const caretakersRes = await axios.get(
        "/api/users/caretakers"
      );

      setCaretakers(caretakersRes.data || []);

    } catch (err) {
      console.log("Error:", err);
    }
  };

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetchData();
  }, []);

  /* ================= BOOK FUNCTION ================= */
  const handleBook = async (caretaker) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("/api/bookings/create", {
        childId: user._id,
        caretakerId: caretaker._id,   // ✅ important
        service: "General Care",
        date: new Date().toISOString().split("T")[0]
      });

      alert("Booked Successfully ✅");

      fetchData(); // ✅ auto refresh dashboard

    } catch (err) {
      console.log(err);
      alert("Booking failed ❌");
    }
  };

  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2 className="brand">Nest Life:CURA</h2>

        <ul>
          <li className="active">Dashboard</li>
          <li onClick={() => navigate("/book-service")}>Book Service</li>
          {/* <li>Search Caretakers</li> */}
          <li onClick={() => navigate("/complaints")}>Complaints</li>
          <li onClick={() => navigate("/emergency")}>Emergency</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* ================= MAIN ================= */}
      <div className="dashboard-main">

        <h1>Dashboard</h1>

        <div className="dashboard-content">

          {/* ========= STATS ========= */}
          <div className="stats-row">

            <div className="stat-card">
              <p>Total Bookings</p>
              <h2>{stats.bookings || 0}</h2>
            </div>

            <div className="stat-card">
              <p>Active Caretakers</p>
              <h2>{caretakers.length}</h2>
            </div>

            <div className="stat-card">
              <p>Complaints</p>
              <h2>{stats.complaints || 0}</h2>
            </div>

            <div className="stat-card">
              <p>Emergency</p>
              <h2>{stats.emergency || 0}</h2>
            </div>

          </div>

          {/* ========= GRID ========= */}
          <div className="dashboard-grid">

            {/* LEFT */}
            <div className="dashboard-left">

              {/* RECENT REQUESTS */}
              <div className="card-box">
                <h3>Recent Requests</h3>

                <table className="request-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Duration</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentRequests.length > 0 ? (
                      recentRequests.map((req, i) => (
                        <tr key={i}>
                          <td>{req.caretakerId?.name || "N/A"}</td>
                          <td>{req.service}</td>
                          {/* <td>
  {req.fromDate && req.toDate ? (
    <>
      <span>{req.fromDate.split("T")[0]}</span>
      <br />
      <span style={{ fontSize: "12px", color: "gray" }}>
        to {req.toDate.split("T")[0]}
      </span>
    </>
  ) : (
    "N/A"
  )}
</td> */}
<td>
  {req.fromDate
    ? new Date(req.fromDate).toLocaleDateString()
    : "N/A"}
  <br />
  to
  <br />
  {req.toDate
    ? new Date(req.toDate).toLocaleDateString()
    : "N/A"}
</td>
                          <td>
                            <span className={`status ${req.status || "pending"}`}>
                              {req.status || "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No Requests</td>
                      </tr>
                    )}
                  </tbody>
                </table>

              </div>

              {/* AVAILABLE CARETAKERS */}
              <div className="card-box">
                <h3>Available Caretakers</h3>

{caretakers.length > 0 ? (
  <>
    {caretakers.slice(0, 5).map((c, i) => (
      <div
        key={i}
        style={{
          marginBottom: "12px",
          padding: "12px",
          background: "#f5f7f5",
          borderRadius: "10px"
        }}
      >

        {/* NAME */}
        <h4 style={{ margin: "0 0 6px 0" }}>
          {c.name || "No Name"}
        </h4>

        {/* BULLET DETAILS */}
        <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px" }}>
          <li>Email: {c.email || "N/A"}</li>
          <li>Mobile: {c.phone || "N/A"}</li>
          <li>Aadhar: {c.aadhar || "N/A"}</li>
          <li>Location: {c.location || "N/A"}</li>
          <li>Criminal Record: {c.criminalRecord || "Clear"}</li>
          <li>Past Work: {c.pastWork || "N/A"}</li>
        </ul>

        {/* BUTTON */}
        <button
          onClick={() => handleBook(c)}
          style={{
            marginTop: "10px",
            background: "#5c8d6a",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Book
        </button>

      </div>
    ))}

    {/* VIEW MORE */}
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <button
        onClick={() => navigate("/book-service")}
        style={{
          background: "#5c8d6a",
          color: "white",
          border: "none",
          padding: "6px 14px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        View More
      </button>
    </div>
  </>
) : (
  <p>No caretakers available</p>
)}

              </div>

            </div>

            {/* RIGHT */}
            <div className="dashboard-right">

              <div className="card-box">
                <h3>Emergency Alerts</h3>

                {alerts.length > 0 ? (
                  alerts.map((a, i) => (
                    <div key={i} className="alert-item">
                      <b>{a.name}</b>
                      <p>{a.message}</p>
                      <span>{a.time}</span>
                    </div>
                  ))
                ) : (
                  <p>No Alerts</p>
                )}
              </div>

              <div className="card-box">
                <h3>Complaints</h3>

                {complaints.length > 0 ? (
                  complaints.map((c, i) => (
                    <div key={i} className="alert-item">
                      <b>{c.name}</b>
                      <p>{c.message}</p>
                      <span>{c.time}</span>
                    </div>
                  ))
                ) : (
                  <p>No Complaints</p>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChildDashboard;