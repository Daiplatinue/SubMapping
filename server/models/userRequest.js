import mongoose from "mongoose"

const RequestSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  priority: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Request = mongoose.model("Request", RequestSchema)

export { Request }