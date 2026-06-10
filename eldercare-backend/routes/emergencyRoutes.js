import express from "express";

import Emergency from "../models/EmergencyAlert.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const emergency = await Emergency.create({
      ...req.body,
      time: req.body.time || new Date().toISOString(),
    });

    res.status(201).json(emergency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });
    res.json(emergencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
