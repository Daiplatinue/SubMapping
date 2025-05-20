import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Notification = mongoose.model("Notification", NotificationSchema)

export { Notification }