import { useEffect, useState } from "react";
import { dashboardStyles } from "../styles";

function CaretakerDashboard() {
  const [caretaker, setCaretaker] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const navClass = (menu) =>
    activeMenu === menu ? dashboardStyles.activeNavItem : dashboardStyles.navItem;

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
      <h2 className="mt-[50px] text-center text-2xl font-semibold text-[#2f3e2f]">
        No Data Found ⚠️
      </h2>
    );
  }

  return (
    <div className={dashboardStyles.layout}>

      {/* ================= SIDEBAR ================= */}
      <div className={dashboardStyles.sidebar}>
        <h2 className={dashboardStyles.brand}>ElderCare Connect</h2>

        <ul className={dashboardStyles.navList}>
          <li
            className={navClass("dashboard")}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={navClass("profile")}
            onClick={() => setActiveMenu("profile")}
          >
            Profile
          </li>

          <li
            className={navClass("bookings")}
            onClick={() => setActiveMenu("bookings")}
          >
            Bookings
          </li>

          <li
            className={navClass("ongoing")}
            onClick={() => setActiveMenu("ongoing")}
          >
            Ongoing Work
          </li>

          <li
            className={navClass("previous")}
            onClick={() => setActiveMenu("previous")}
          >
            Previous Work
          </li>

          <li
            className={navClass("earnings")}
            onClick={() => setActiveMenu("earnings")}
          >
            Earnings
          </li>
        </ul>
      </div>

      {/* ================= MAIN ================= */}
      <div className={dashboardStyles.main}>

        <h1 className={dashboardStyles.pageTitle}>
          Welcome, {caretaker.name} 
        </h1>

        {/* ================= PROFILE ================= */}
        {activeMenu === "profile" && (
          <div className={dashboardStyles.card}>

            <h2 className="text-2xl font-semibold text-[#2f3e2f]">Profile Details</h2>

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
            <div className={dashboardStyles.statsRow}>

  <div className={dashboardStyles.statCard}>
    <p className={dashboardStyles.statLabel}>Total Bookings</p>
    <h2 className={dashboardStyles.statValue}>{bookings.length}</h2>
  </div>

  <div className={dashboardStyles.statCard}>
    <p className={dashboardStyles.statLabel}>Accepted Jobs</p>
    <h2 className={dashboardStyles.statValue}>{ongoingWork.length}</h2>
  </div>

  <div className={dashboardStyles.statCard}>
    <p className={dashboardStyles.statLabel}>Completed Jobs</p>
    <h2 className={dashboardStyles.statValue}>{previousWork.length}</h2>
  </div>

  <div className={dashboardStyles.statCard}>
    <p className={dashboardStyles.statLabel}>Pending Requests</p>
    <h2 className={dashboardStyles.statValue}>
      {
        bookings.filter(
          (b) => b.status === "pending"
        ).length
      }
    </h2>
  </div>

</div>

            <div className={dashboardStyles.card}>

              <h3 className={dashboardStyles.cardTitle}>Work Summary</h3>

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
          <div className={dashboardStyles.card}>

            <h2 className="text-2xl font-semibold text-[#2f3e2f]">Bookings</h2>

            <br />

            {bookings.length > 0 ? (
              bookings.map((b) => (
                <div
                  key={b._id}
                  className={dashboardStyles.bookingCard}
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
                        className={dashboardStyles.acceptSmall}
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
                        className={dashboardStyles.rejectSmall}
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
                      className={dashboardStyles.acceptSmall}
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
          <div className={dashboardStyles.card}>

            <h2 className="text-2xl font-semibold text-[#2f3e2f]">Ongoing Work</h2>

            <br />

            {ongoingWork.length > 0 ? (
              ongoingWork.map((b) => (
                <div
                  key={b._id}
                  className={dashboardStyles.bookingCard}
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
          <div className={dashboardStyles.card}>

            <h2 className="text-2xl font-semibold text-[#2f3e2f]">Previous Work</h2>

            <br />

            {previousWork.length > 0 ? (
              previousWork.map((b) => (
                <div
                  key={b._id}
                  className={dashboardStyles.bookingCard}
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
          <div className={dashboardStyles.card}>

            <h2 className="text-2xl font-semibold text-[#2f3e2f]">Total Earnings</h2>

            <br />

            <h1 className="mt-5 text-4xl font-bold text-[#5c8d6a]">₹ {totalEarnings}</h1>

          </div>
        )}

      </div>
    </div>
  );
}

export default CaretakerDashboard;
