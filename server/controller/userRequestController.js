import { Request } from "../models/userRequest.js"

const postRequest = async (req, res) => {
  try {
    const { type, desc, date, location, priority, requester, houseId } = req.body

    if (!type || !desc || !date || !location || !priority || !requester || !houseId) {
      return res.status(400).json({ message: "Please fill all fields" })
    }

    const newRequest = await Request.create({
      type,
      desc,
      date,
      location,
      priority,
      requester,
      houseId,
    })

    return res.status(201).json(newRequest)
  } catch (error) {
    console.error("Request creation error:", error)
    return res.status(500).json({ message: "Server error while processing Request request" })
  }
}

const getRequestsByRequester = async (req, res) => {
  try {
    const { requesterId } = req.params

    if (!requesterId) {
      return res.status(400).json({ message: "Requester ID is required" })
    }

    const requests = await Request.find({ requester: requesterId }).sort({ createdAt: -1 })
    return res.status(200).json(requests)
  } catch (error) {
    console.error("Error fetching requests:", error)
    return res.status(500).json({ message: "Server error while fetching requests" })
  }
}

export { postRequest, getRequestsByRequester }