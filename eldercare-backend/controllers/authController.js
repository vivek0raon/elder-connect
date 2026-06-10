import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,

      profileCompleted: false,

      // Child Fields
      job: "",
      address: "",
      parentAddress: "",
      city: "",
      emergencyContact: "",
      notes: "",

      // Caretaker Fields
      aadhar: "",
      criminalRecord: "",
      location: "",
      pastWork: "",
      phone: "",
      photo: "",

      previousWork: [],
      ongoingWork: [],
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign(
      { id: user._id },
      "secret"
    );

    res.json({
      token,
      user,
      profileCompleted: user.profileCompleted,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= COMPLETE PROFILE ================= */
export const completeProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        profileCompleted: true,
      },
      { new: true }
    );

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};