
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dashboardStyles, statusClass } from "../styles";

const ChildDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

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
    <div className={dashboardStyles.layout}>

      {/* ================= SIDEBAR ================= */}
      <div className={dashboardStyles.sidebar}>
        <h2 className={dashboardStyles.brand}>Nest Life:CURA</h2>

        <ul className={dashboardStyles.navList}>
          <li className={dashboardStyles.activeNavItem}>Dashboard</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/book-service")}>Book Service</li>
          {/* <li>Search Caretakers</li> */}
          <li className={dashboardStyles.navItem} onClick={() => navigate("/complaints")}>Complaints</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/emergency")}>Emergency</li>
          <li className={dashboardStyles.navItem} onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </div>

      {/* ================= MAIN ================= */}
      <div className={dashboardStyles.main}>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className={dashboardStyles.pageTitle}>Dashboard</h1>
          <button
            className={dashboardStyles.dangerButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className={dashboardStyles.content}>

          {/* ========= STATS ========= */}
          <div className={dashboardStyles.statsRow}>

            <div className={dashboardStyles.statCard}>
              <p className={dashboardStyles.statLabel}>Total Bookings</p>
              <h2 className={dashboardStyles.statValue}>{stats.bookings || 0}</h2>
            </div>

            <div className={dashboardStyles.statCard}>
              <p className={dashboardStyles.statLabel}>Active Caretakers</p>
              <h2 className={dashboardStyles.statValue}>{caretakers.length}</h2>
            </div>

            <div className={dashboardStyles.statCard}>
              <p className={dashboardStyles.statLabel}>Complaints</p>
              <h2 className={dashboardStyles.statValue}>{stats.complaints || 0}</h2>
            </div>

            <div className={dashboardStyles.statCard}>
              <p className={dashboardStyles.statLabel}>Emergency</p>
              <h2 className={dashboardStyles.statValue}>{stats.emergency || 0}</h2>
            </div>

          </div>

          {/* ========= GRID ========= */}
          <div className={dashboardStyles.grid}>

            {/* LEFT */}
            <div className={dashboardStyles.left}>

              {/* RECENT REQUESTS */}
              <div className={dashboardStyles.card}>
                <h3 className={dashboardStyles.cardTitle}>Recent Requests</h3>

                <table className={dashboardStyles.table}>
                  <thead>
                    <tr>
                      <th className={`${dashboardStyles.tableHead} ${dashboardStyles.tableHeader}`}>Name</th>
                      <th className={`${dashboardStyles.tableHead} ${dashboardStyles.tableHeader}`}>Service</th>
                      <th className={`${dashboardStyles.tableHead} ${dashboardStyles.tableHeader}`}>Duration</th>
                      <th className={`${dashboardStyles.tableHead} ${dashboardStyles.tableHeader}`}>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentRequests.length > 0 ? (
                      recentRequests.map((req, i) => (
                        <tr key={i}>
                          <td className={dashboardStyles.tableCell}>{req.caretakerId?.name || "N/A"}</td>
                          <td className={dashboardStyles.tableCell}>{req.service}</td>
<td className={dashboardStyles.tableCell}>
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
                          <td className={dashboardStyles.tableCell}>
                            <span className={statusClass(req.status || "pending")}>
                              {req.status || "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className={dashboardStyles.tableCell} colSpan="4">No Requests</td>
                      </tr>
                    )}
                  </tbody>
                </table>

              </div>

              {/* AVAILABLE CARETAKERS */}
              <div className={dashboardStyles.card}>
                <h3 className={dashboardStyles.cardTitle}>Available Caretakers</h3>

{caretakers.length > 0 ? (
  <>
    {caretakers.slice(0, 5).map((c, i) => (
      <div
        key={i}
        className="mb-3 rounded-[10px] bg-[#f5f7f5] p-3"
      >

        {/* NAME */}
        <h4 className="mb-1.5 mt-0 font-semibold">
          {c.name || "No Name"}
        </h4>

        {/* BULLET DETAILS */}
        <ul className="m-0 pl-[18px] text-[13px]">
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
          className={dashboardStyles.primarySmall}
        >
          Book
        </button>

      </div>
    ))}

    {/* VIEW MORE */}
    <div className="mt-2.5 text-center">
      <button
        onClick={() => navigate("/book-service")}
        className={dashboardStyles.primarySmall}
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
            <div className={dashboardStyles.right}>

              <div className={dashboardStyles.card}>
                <h3 className={dashboardStyles.cardTitle}>Emergency Alerts</h3>

                {alerts.length > 0 ? (
                  alerts.map((a, i) => (
                    <div key={i} className={dashboardStyles.alertItem}>
                      <b>{a.name}</b>
                      <p>{a.message}</p>
                      <span>{a.time}</span>
                    </div>
                  ))
                ) : (
                  <p>No Alerts</p>
                )}
              </div>

              <div className={dashboardStyles.card}>
                <h3 className={dashboardStyles.cardTitle}>Complaints</h3>

                {complaints.length > 0 ? (
                  complaints.map((c, i) => (
                    <div key={i} className={dashboardStyles.alertItem}>
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
