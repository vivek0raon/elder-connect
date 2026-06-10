import express from "express";

import {
  createBooking,
  getCaretakerBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);

router.get(
  "/caretaker/:id",
  getCaretakerBookings
);

router.put(
  "/:id",
  updateBookingStatus
);

export default router;