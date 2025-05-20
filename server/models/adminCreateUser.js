import mongoose from "mongoose"
import bcrypt from "bcrypt" 
import mongooseBcrypt from "mongoose-bcrypt" 

const adminCreateUserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    bcrypt: true, 
    required: function () {
      return this.createdBy === "self"
    },
  },
  contact: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: function () {
      return this.type !== "guard"
    },
  },
  houseId: {
    type: String,
    required: function () {
      return this.type !== "guard"
    },
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive", "Suspended", "Pending"],
  },
  createdBy: {
    type: String,
    enum: ["admin", "self"],
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

adminCreateUserSchema.plugin(mongooseBcrypt)

adminCreateUserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const adminCreateUser = mongoose.model("adminCreateUser", adminCreateUserSchema)

export { adminCreateUser }