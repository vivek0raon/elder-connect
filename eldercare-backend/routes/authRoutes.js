import express from "express";
import {
  registerUser,
  loginUser,
  completeProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/complete-profile/:id", completeProfile);

export default router;
