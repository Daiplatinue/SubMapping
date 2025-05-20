import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  houseId: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
    enum: ["utilities", "water", "electricity", "association"],
  },
  amount: {
    type: Number,
    required: true,
  },
  processingFee: {
    type: Number,
    required: true,
    default: 20,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  cardDetails: {
    cardNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    nameOnCard: {
      type: String,
      required: true,
    },
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "recieved"],
  },
})

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)

export { Payment }