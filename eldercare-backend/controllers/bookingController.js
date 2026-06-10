import Booking from "../models/Booking.js";

/* CREATE BOOKING */
export const createBooking = async (req, res) => {
  try {
    const { childId, caretakerId, service, fromDate, toDate } = req.body;

    const booking = await Booking.create({
      childId,
      caretakerId,
      service,
      fromDate,
      toDate,
      status: "pending"
    });

    res.json(booking);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* GET CARETAKER BOOKINGS */
export const getCaretakerBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      caretakerId: req.params.id
    }).populate("childId", "name email");

    res.json(bookings);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE STATUS */
export const updateBookingStatus = async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    );

    res.json(booking);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};