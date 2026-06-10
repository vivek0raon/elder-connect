import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema({
  userId: String,
  childId: String,
  caretakerId: String,
  type: String,
  location: String,
  urgency: String,
  contact: String,
  name: String,
  message: String,
  time: String,
});

export default mongoose.model("Emergency", emergencySchema);
