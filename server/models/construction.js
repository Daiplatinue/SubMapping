import mongoose from "mongoose"
import { type } from "os"

const ConstructionSchema = new mongoose.Schema({
  block: {
    type: String,
    required: true,
  },
  houseId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
})

const Construction = mongoose.model("Construction", ConstructionSchema)

export { Construction }