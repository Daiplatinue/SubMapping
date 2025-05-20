import { Notification } from "../models/notification.js"

const postNotification = async (req, res) => {
  try {
    const { type, recipient, subject, message, priority } = req.body

    if (!type || !recipient || !subject || !message || !priority) {
      return res.status(400).json({ message: "Please fill all fields" })
    }

    const newNotification = await Notification.create({
      type,
      recipient,
      subject,
      message,
      priority,
    })

    return res.status(201).json(newNotification)
  } catch (error) {
    console.error("Notification creation error:", error)
    return res.status(500).json({ message: "Server error while processing Notification" })
  }
}

// Add this function to get all Notifications
const getAllNotifications = async (req, res) => {
  try {
    const Notifications = await Notification.find({})
    return res.status(200).json(Notifications)
  } catch (error) {
    console.error("Error fetching Notifications:", error)
    return res.status(500).json({ message: "Server error while fetching Notifications" })
  }
}

// Update the export to include the new function
export { postNotification, getAllNotifications }