import { useEffect, useState } from "react";
import "./dashboard.css";

function CaretakerDashboard() {
  const [caretaker, setCaretaker] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [bookings, setBookings] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("user"));

      if (!data) {
        return;
      }

      setCaretaker(data);

      try {
        const res = await fetch(
          `/api/bookings/caretaker/${data._id}`
        );

        const bookingData = await res.json();

        setBookings(bookingData);

      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, []);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
  try {

    const res = await fetch(
      `/api/bookings/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    console.log("Updated Booking:", data);
    console.log("Response Status:", res.status);

    setBookings((prev) =>
      prev.map((b) =>
        b._id === id
          ? { ...b, status }
          : b
      )
    );

  } catch (err) {
    console.log("Update Error:", err);
  }
};

  // ================= FILTER =================
  const previousWork = bookings.filter(
    (b) => b.status === "completed"
  );

  const ongoingWork = bookings.filter(
    (b) => b.status === "accepted"
  );

  // ================= EARNINGS =================
  const totalEarnings = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  // ================= DATE =================
 const formatDate = (date) => {
  if (!date) return "N/A";

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "N/A";
  }

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
  // ================= NO DATA =================
  if (!caretaker) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No Data Found ⚠️
      </h2>
    );
  }

  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2 className="brand">ElderCare Connect</h2>

        <ul>
          <li
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={activeMenu === "profile" ? "active" : ""}
            onClick={() => setActiveMenu("profile")}
          >
            Profile
          </li>

          <li
            className={activeMenu === "bookings" ? "active" : ""}
            onClick={() => setActiveMenu("bookings")}
          >
            Bookings
          </li>

          <li
            className={activeMenu === "ongoing" ? "active" : ""}
            onClick={() => setActiveMenu("ongoing")}
          >
            Ongoing Work
          </li>

          <li
            className={activeMenu === "previous" ? "active" : ""}
            onClick={() => setActiveMenu("previous")}
          >
            Previous Work
          </li>

          <li
            className={activeMenu === "earnings" ? "active" : ""}
            onClick={() => setActiveMenu("earnings")}
          >
            Earnings
          </li>
        </ul>
      </div>

      {/* ================= MAIN ================= */}
      <div className="dashboard-main">

        <h1>
          Welcome, {caretaker.name} 
        </h1>

        {/* ================= PROFILE ================= */}
        {activeMenu === "profile" && (
          <div className="card-box">

            <h2>Profile Details</h2>

            <br />

            <p>
              <b>Name:</b> {caretaker.name}
            </p>

            <p>
              <b>Email:</b> {caretaker.email}
            </p>

            <p>
              <b>Phone:</b> {caretaker.phone}
            </p>

            <p>
              <b>Aadhar:</b> {caretaker.aadhar}
            </p>

            <p>
              <b>Experience:</b> {caretaker.pastWork}
            </p>

          </div>
        )}

        {/* ================= DASHBOARD ================= */}
        {activeMenu === "dashboard" && (
          <>
            <div className="stats-row">

  <div className="stat-card">
    <p>Total Bookings</p>
    <h2>{bookings.length}</h2>
  </div>

  <div className="stat-card">
    <p>Accepted Jobs</p>
    <h2>{ongoingWork.length}</h2>
  </div>

  <div className="stat-card">
    <p>Completed Jobs</p>
    <h2>{previousWork.length}</h2>
  </div>

  <div className="stat-card">
    <p>Pending Requests</p>
    <h2>
      {
        bookings.filter(
          (b) => b.status === "pending"
        ).length
      }
    </h2>
  </div>

</div>

            <div className="card-box">

              <h3>Work Summary</h3>

              <br />

              <p>
                Ongoing Work: {ongoingWork.length}
              </p>

              <p>
                Completed Work: {previousWork.length}
              </p>

            </div>
          </>
        )}

        {/* ================= BOOKINGS ================= */}
        {activeMenu === "bookings" && (
          <div className="card-box">

            <h2>Bookings</h2>

            <br />

            {bookings.length > 0 ? (
              bookings.map((b) => (
                <div
                  key={b._id}
                  className="booking-card"
                >

                  <p>
                    <b>Client:</b> {b.childId?.name}
                  </p>

                  <p>
                    <b>Service:</b> {b.service}
                  </p>

                  <p>
                    <>
                      <p>
                        <b>From:</b> {formatDate(b.fromDate)}
                      </p>

                      <p>
                        <b>To:</b> {formatDate(b.toDate)}
                      </p>
                    </>
                  </p>

                  <p>
                    <b>Status:</b> {b.status}
                  </p>

                  <p>
                    <b>Payment:</b>{" "}
                    {b.paymentStatus || "pending"}
                  </p>

                  {/* PENDING */}
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(
                            b._id,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            b._id,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* ACCEPTED */}
                  {b.status === "accepted" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          b._id,
                          "completed"
                        )
                      }
                    >
                      Mark Completed
                    </button>
                  )}

                </div>
              ))
            ) : (
              <p>No Bookings Yet</p>
            )}

          </div>
        )}

        {/* ================= ONGOING ================= */}
        {activeMenu === "ongoing" && (
          <div className="card-box">

            <h2>Ongoing Work</h2>

            <br />

            {ongoingWork.length > 0 ? (
              ongoingWork.map((b) => (
                <div
                  key={b._id}
                  className="booking-card"
                >
                  <p>
                    <b>Service:</b> {b.service}
                  </p>

                  <p>
                    <>
                      <p>
                        <b>From:</b> {formatDate(b.fromDate)}
                      </p>

                      <p>
                        <b>To:</b> {formatDate(b.toDate)}
                      </p>
                    </>
                  </p>

                  <p>
                    <b>Status:</b> {b.status}
                  </p>
                </div>
              ))
            ) : (
              <p>No Ongoing Work</p>
            )}

          </div>
        )}

        {/* ================= PREVIOUS ================= */}
        {activeMenu === "previous" && (
          <div className="card-box">

            <h2>Previous Work</h2>

            <br />

            {previousWork.length > 0 ? (
              previousWork.map((b) => (
                <div
                  key={b._id}
                  className="booking-card"
                >
                  <p>
                    <b>Service:</b> {b.service}
                  </p>

                  <p>
                    <>
                      <p>
                        <b>From:</b> {formatDate(b.fromDate)}
                      </p>

                      <p>
                        <b>To:</b> {formatDate(b.toDate)}
                      </p>
                    </>
                  </p>
                </div>
              ))
            ) : (
              <p>No Previous Work</p>
            )}

          </div>
        )}

        {/* ================= EARNINGS ================= */}
        {activeMenu === "earnings" && (
          <div className="card-box">

            <h2>Total Earnings</h2>

            <br />

            <h1>₹ {totalEarnings}</h1>

          </div>
        )}

      </div>
    </div>
  );
}

export default CaretakerDashboard;