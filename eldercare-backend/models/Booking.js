import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  caretakerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  service: String,

  fromDate: Date,

  toDate: Date,

  status: {
    type: String,
    default: "pending"
  }
});
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;