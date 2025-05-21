import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { postEmergency } from "./controller/emergencyController.js"
import { postRequest, getRequestsByRequester } from "./controller/userRequestController.js"
import { postReport, getReportsByRequester, getAllReports } from "./controller/reportController.js"
import { postPayment, getPaymentsByUserId, getAllPayments } from "./controller/paymentController.js"
import { postConstruction, getAllConstructions } from "./controller/constructionController.js"
import {
  postadminCreateUser,
  customerCreateUser,
  loginUser as adminLoginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByBlockAndHouseId,
} from "./controller/adminCreateUserController.js"
import { postNotification, getAllNotifications } from "./controller/notificationController.js"

console.log("MONGO_URL:", process.env.MONGO_URL)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed", err))

const app = express()
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)
app.use(express.json())

// Authentication Routes - Updated
app.post("/postadminCreateUser", customerCreateUser)
app.post("/login", adminLoginUser)

// Household Owner Routes
app.post("/postEmergency", postEmergency)

app.post("/postRequest", postRequest)
app.get("/requests/:requesterId", getRequestsByRequester)

app.post("/postReport", postReport)
app.get("/reports/:requesterId", getReportsByRequester)

app.post("/postPayment", postPayment)
app.get("/payments/:userId", getPaymentsByUserId)

// Admin Routes
app.post("/postConstruction", postConstruction)
app.get("/constructions", getAllConstructions)
app.post("/adminCreateUser", postadminCreateUser)
app.get("/users", getAllUsers)
app.get("/users/:id", getUserById)
app.put("/users/:id", updateUser)
app.delete("/users/:id", deleteUser)
// Add a new route for getting users by block and houseId
// Add this after the other user routes (around line 50)
app.get("/users/block/:block/house/:houseId", getUsersByBlockAndHouseId)
app.get("/payments", getAllPayments)
app.get("/reports", getAllReports)
app.post("/postNotification", postNotification)
app.get("/notifications", getAllNotifications)

app.get("/", (req, res) => {
  console.log("req.body")
  res.send("API is running")
})

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`)
})