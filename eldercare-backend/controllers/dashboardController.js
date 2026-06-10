import Booking from "../models/Booking.js";
import Complaint from "../models/Complaint.js";
// import Emergency from "../models/Emergency.js"; // not using now

export const getChildDashboard = async (req, res) => {
  try {
    const userId = req.params.id;

    /* ================= COUNTS ================= */
    const bookingsCount = await Booking.countDocuments({ childId: userId });
    const complaintsCount = await Complaint.countDocuments({ childId: userId });

    // since Emergency removed
    const emergencyCount = 0;

    /* ================= RECENT BOOKINGS ================= */
    const recentRequests = await Booking.find({ childId: userId })
  .populate("caretakerId", "name")
  .sort({ _id: -1 }) // ✅ latest first
  .limit(5);

    /* ================= ALERTS (TEMP EMPTY) ================= */
    const alerts = [];

    /* ================= COMPLAINTS ================= */
    const complaints = await Complaint.find({ childId: userId }).limit(3);

    /* ================= RESPONSE ================= */
    res.json({
      stats: {
        bookings: bookingsCount,
        caretakers: 0, // can improve later
        complaints: complaintsCount,
        emergency: emergencyCount
      },
      recentRequests,
      alerts,
      complaints
    });

  } catch (err) {
    console.log("Dashboard Error:", err);
    res.status(500).json({ message: err.message });
  }
};