import { Construction } from "../models/construction.js"

const postConstruction = async (req, res) => {
  try {
    const { block, houseId, type, start, end } = req.body

    if (!block || !houseId || !type || !start || !end) {
      return res.status(400).json({ message: "Please fill all fields" })
    }

    const newConstruction = await Construction.create({
      block,
      houseId,
      type,
      start,
      end,
    })

    return res.status(201).json(newConstruction)
  } catch (error) {
    console.error("Construction creation error:", error)
    return res.status(500).json({ message: "Server error while processing Construction Construction" })
  }
}

// Add this function to get all constructions
const getAllConstructions = async (req, res) => {
  try {
    const constructions = await Construction.find({})
    return res.status(200).json(constructions)
  } catch (error) {
    console.error("Error fetching constructions:", error)
    return res.status(500).json({ message: "Server error while fetching constructions" })
  }
}

// Update the export to include the new function
export { postConstruction, getAllConstructions }