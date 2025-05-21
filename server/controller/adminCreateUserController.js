import { adminCreateUser } from "../models/adminCreateUser.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const postadminCreateUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      middlename,
      email,
      contact,
      type,
      block,
      houseId,
      status = "Active",
      password,
    } = req.body

    if (!firstname || !lastname || !email || !contact || !type) {
      return res.status(400).json({ message: "Please fill all required fields" })
    }

    const existingUser = await adminCreateUser.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" })
    }

    if (type !== "guard" && (!block || !houseId)) {
      return res.status(400).json({ message: "Block and House ID are required for residents" })
    }

    const userData = {
      firstname,
      lastname,
      middlename,
      email,
      contact,
      type,
      status,
    }

    // Add password if provided by admin
    if (password) {
      userData.password = password
    }

    // Add block and houseId if user is not a guard
    if (type !== "guard") {
      userData.block = block
      userData.houseId = houseId
    }

    const newadminCreateUser = await adminCreateUser.create(userData)

    return res.status(201).json(newadminCreateUser)
  } catch (error) {
    console.error("adminCreateUser creation error:", error)
    return res.status(500).json({ message: "Server error while processing adminCreateUser request" })
  }
}

const customerCreateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, contact, password, block, houseId } = req.body

    if (!firstname || !lastname || !email || !contact || !password) {
      return res.status(400).json({ message: "Please fill all required fields" })
    }

    const existingUser = await adminCreateUser.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" })
    }

    const newUser = await adminCreateUser.create({
      firstname,
      lastname,
      email,
      contact,
      password,
      type: "customer",
      status: "Pending",
      createdBy: "self",
      block: block || "Pending",
      houseId: houseId || "Pending",
    })

    return res.status(201).json({
      message: "Account created successfully. Your account is pending approval.",
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        status: newUser.status,
      },
    })
  } catch (error) {
    console.error("Customer registration error:", error)
    return res.status(500).json({ message: "Server error while processing registration" })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await adminCreateUser.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    if (!user.password) {
      return res.status(400).json({ message: "Invalid login method" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    if (user.status === "Pending") {
      return res.status(400).json({ message: "Your account is pending approval" })
    }

    if (user.status === "Inactive" || user.status === "Suspended") {
      return res.status(400).json({ message: "Your account is " + user.status.toLowerCase() })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" },
    )

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        type: user.type,
        status: user.status,
        block: user.block,
        houseId: user.houseId,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ message: "Server error while processing login" })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await adminCreateUser.find({})
    return res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return res.status(500).json({ message: "Server error while fetching users" })
  }
}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await adminCreateUser.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return res.status(500).json({ message: "Server error while fetching user" })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const { firstname, lastname, middlename, email, contact, type, block, houseId, status } = req.body

    const existingUser = await adminCreateUser.findById(userId)
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" })
    }

    if (email !== existingUser.email) {
      const emailExists = await adminCreateUser.findOne({ email, _id: { $ne: userId } })
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" })
      }
    }

    const updateData = {}
    if (firstname) updateData.firstname = firstname
    if (lastname) updateData.lastname = lastname
    if (middlename !== undefined) updateData.middlename = middlename
    if (email) updateData.email = email
    if (contact) updateData.contact = contact
    if (status) updateData.status = status

    if (type) {
      updateData.type = type

      if (type === "guard") {
        updateData.block = undefined
        updateData.houseId = undefined
      } else if (block && houseId) {
        updateData.block = block
        updateData.houseId = houseId
      }
    } else if (existingUser.type !== "guard") {
      if (block) updateData.block = block
      if (houseId) updateData.houseId = houseId
    }

    const updatedUser = await adminCreateUser.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return res.status(500).json({ message: "Server error while updating user" })
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id

    const deletedUser = await adminCreateUser.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return res.status(500).json({ message: "Server error while deleting user" })
  }
}

// Add a new function to get users by block and houseId
const getUsersByBlockAndHouseId = async (req, res) => {
  try {
    const { block, houseId } = req.params

    if (!block || !houseId) {
      return res.status(400).json({ message: "Block and House ID are required" })
    }

    const users = await adminCreateUser.find({ block, houseId })
    return res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users by block and houseId:", error)
    return res.status(500).json({ message: "Server error while fetching users" })
  }
}

// Add the new function to the exports at the end of the file
export {
  postadminCreateUser,
  customerCreateUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByBlockAndHouseId,
}
