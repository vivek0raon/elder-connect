import express from "express";
import { getChildDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/child/:id", getChildDashboard);

export default router;