import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// const CLIENT_URLS = (process.env.CLIENT_URL || "http://localhost:5173")
//   .split(",")
//   .map((s) => s.trim());
// console.log("➡️ Allowed CORS origins:", CLIENT_URLS);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// const corsOptionsDelegate = (req, callback) => {
//   const origin = req.header("Origin");
//   const host = req.header("Host");

//   let isSameOrigin = false;
//   if (origin && host) {
//     try {
//       const originUrl = new URL(origin);
//       isSameOrigin = originUrl.host === host;
//     } catch (e) {
//       isSameOrigin = origin.endsWith(host);
//     }
//   }

//   let corsOptions;
//   if (!origin || isSameOrigin || CLIENT_URLS.includes(origin)) {
//     corsOptions = { origin: true, credentials: true };
//   } else {
//     corsOptions = { origin: false };
//   }
//   callback(null, corsOptions);
// };

// app.use(cors(corsOptionsDelegate));
app.use(express.json());

/* ================= MONGODB ================= */
connectDB();

/* ================= ROUTES ================= */
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files from the built dist folder directly.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../eldercare-frontend/dist")));

  app.get("/*any", (req, res) => {
    res.sendFile(path.join(__dirname, "../eldercare-frontend", "dist", "index.html"));
  });
}

/* ================= SERVER ================= */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
