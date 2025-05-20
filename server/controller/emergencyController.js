import { Emergency } from "../models/emergency.js"

const postEmergency = async (req, res) => {
  try {
    const { type, description, contact, requester, houseId } = req.body

    if (!type || !description || !contact) {
      return res.status(400).json({ message: "Please fill all fields" })
    }

    const newEmergency = await Emergency.create({
      type,
      description,
      contact,
      requester: requester || "Unknown",
      houseId: houseId || "Unknown",
    })

    return res.status(201).json(newEmergency)
  } catch (error) {
    console.error("Emergency creation error:", error)
    return res.status(500).json({ message: "Server error while processing emergency request" })
  }
}

export { postEmergency }