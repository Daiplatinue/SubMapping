import { Report } from "../models/report.js"

// Function to create a new report
const postReport = async (req, res) => {
  try {
    const { type, dateTime, desc, location, witness, severity, requester, houseId, block, status } = req.body

    // Validate required fields
    if (!type || !dateTime || !desc || !location || !severity || !houseId) {
      return res.status(400).json({ message: "Please provide all required fields." })
    }

    // Create new report with only provided fields
    const reportData = {
      type,
      dateTime,
      desc,
      location,
      severity,
      houseId,
      requester: requester || "Admin", // Default to Anonymous if not provided
      status: status || "In Progress", // Default to In Progress if not provided
    }

    // Only add optional fields if they are provided
    if (witness) reportData.witness = witness
    if (block) reportData.block = block

    // Create and save the report
    const newReport = new Report(reportData)
    await newReport.save()

    // Respond with the newly created report
    return res.status(201).json({ report: newReport, message: "Report created successfully" })
  } catch (error) {
    // Handle errors
    console.error("Error creating report:", error)
    return res.status(500).json({ message: "Server error while creating report" })
  }
}

// Function to get reports by requester
const getReportsByRequester = async (req, res) => {
  try {
    const requesterId = req.params.requesterId

    // Fetch reports from the database that match the requesterId
    const reports = await Report.find({ requester: requesterId }).sort({ createdAt: -1 })

    // Respond with the fetched reports
    return res.status(200).json(reports)
  } catch (error) {
    // Handle errors
    console.error("Error fetching reports:", error)
    return res.status(500).json({ message: "Server error while fetching reports" })
  }
}

// Add this new function to get all reports for admin view
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 })
    return res.status(200).json(reports)
  } catch (error) {
    console.error("Error fetching all reports:", error)
    return res.status(500).json({ message: "Server error while fetching reports" })
  }
}

// Update the export to include the new function
export { postReport, getReportsByRequester, getAllReports }
