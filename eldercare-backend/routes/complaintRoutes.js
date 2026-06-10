import express from "express";

import Complaint from "../models/Complaint.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      time: req.body.time || new Date().toISOString(),
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
