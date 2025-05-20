import mongoose from "mongoose"

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  witness: {
    type: String,
    required: false, // Changed to false to make it optional
  },
  severity: {
    type: String,
    required: true,
  },
  requester: {
    type: String,
    required: true,
  },
  houseId: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: false, // Added block field as optional
  },
  status: {
    type: String,
    default: "In Progress",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Report = mongoose.model("report", reportSchema)

export { Report }
