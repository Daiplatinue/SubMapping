import { User } from '../models/user.js'

const test = (req, res) => {
    res.json('Test is working')
}

const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, contact, password } = req.body

        if (!firstname || !lastname || !email || !contact || !password) {
            return res.status(400).json({ message: "Please fill all fields" })
        }

        const exist = await User.findOne({ email })
        if (exist) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            contact,
            password
        })

        return res.json(newUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Register server error" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" })
        }

        const user = await User.findOne({ email })
        
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" })
        }

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Login server error" })
    }
}

export { test, registerUser, loginUser }