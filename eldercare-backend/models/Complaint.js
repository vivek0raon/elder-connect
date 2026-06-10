import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  userId: String,
  childId: String,
  caretakerId: String,
  type: String,
  subject: String,
  severity: String,
  incidentDate: String,
  name: String,
  message: String,
  time: String,
});

export default mongoose.model("Complaint", complaintSchema);
