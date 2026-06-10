import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,

  // Child fields
  job: String,
  address: String,
  parentAddress: String,
  city: String,
  emergencyContact: String,
  notes: String,

  // Caretaker fields
  aadhar: String,
  criminalRecord: String,
  location: String,
  pastWork: String,
  phone: String,
  photo: String,

  profileCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);