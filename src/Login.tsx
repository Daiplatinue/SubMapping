import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_URL

function SignInForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (error) setError("")
    if (statusMessage) setStatusMessage("")
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: values.email.trim(),
        password: values.password,
      })

      if (response.data) {
        // Store user data in localStorage
        localStorage.setItem("admincreateusers", JSON.stringify(response.data))

        // Check user role and redirect accordingly
        if (response.data.user.type === "guard") {
          // If user is a guard, redirect to guard page
          navigate("/guard")
        } else if (response.data.user.type === "customer") {
          // If user is a customer, redirect to household-owner
          navigate("/household-owner")
        } else {
          // For other roles, redirect to household-owner as default
          navigate("/household-owner")
        }
      }
    } catch (error: any) {
      console.error("Login error:", error)
      if (error.response?.status === 400) {
        setError(error.response.data.message || "Invalid credentials")
      } else {
        setError("Connection error. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold">Welcome Householder!</h2>
      <p className="mt-1 text-sm">Embrace the future of mapping with Deca Homes.</p>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {statusMessage && (
        <Alert className="mt-4 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Account Status</AlertTitle>
          <AlertDescription className="text-yellow-700">{statusMessage}</AlertDescription>
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="h-12"
            onChange={handleChanges}
            value={values.email}
            required
          />
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="h-12"
            onChange={handleChanges}
            value={values.password}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="h-12 w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitchToRegister} className="text-blue-600 hover:underline">
              Register
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  )
}

function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")

  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (error) setError("")
    if (success) setSuccess("")
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      // Updated endpoint from /register to /postadminCreateUser
      const response = await axios.post(`${API_BASE_URL}/postadminCreateUser`, {
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
        email: values.email.trim(),
        contact: values.contact.trim(),
        password: values.password,
      })

      if (response.data) {
        setSuccess("Account created successfully! Your account is pending approval.")
        setTimeout(() => {
          onSwitchToLogin()
        }, 3000)
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold">Create an Account</h2>
      <p className="mt-1 text-sm">Join the Deca Homes community today.</p>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="h-12"
            onChange={handleChanges}
            value={values.firstname}
            required
          />
          <Input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="h-12"
            onChange={handleChanges}
            value={values.lastname}
            required
          />
        </div>

        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="h-12"
            onChange={handleChanges}
            value={values.email}
            required
          />
        </div>

        <div>
          <Input
            type="text"
            name="contact"
            placeholder="Contact Number"
            className="h-12"
            onChange={handleChanges}
            value={values.contact}
            required
          />
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="h-12"
            onChange={handleChanges}
            value={values.password}
            required
          />
        </div>

        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="h-12"
            onChange={handleChanges}
            value={values.confirmPassword}
            required
          />
        </div>

        <Button type="submit" className="h-12 w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  )
}

function Login() {
  const [isLogin, setIsLogin] = useState(true)

  const switchToRegister = () => {
    setIsLogin(false)
  }

  const switchToLogin = () => {
    setIsLogin(true)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left side with image and overlay text */}
      <div className="relative hidden md:block md:w-3/5">
        <img
          src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="h-full w-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Navigation */}
        <div className="absolute left-0 top-0 w-full p-6">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-white">
              Deca Homes Tunghaan Subdivision Mapping
            </a>
          </div>
        </div>

        {/* Overlay text */}
        <div className="absolute bottom-16 left-6 max-w-md">
          <h1 className="text-4xl font-bold text-white">The Art of Mapping</h1>
          <p className="text-gray-300 mt-5">
            "Mapping is both an art and a science, transforming geographic data into visually structured representations
            of spaces and communities. It plays a crucial role in urban planning, navigation, and development, ensuring
            efficient land use and connectivity"
          </p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex w-full flex-col p-8 md:w-2/5">
        <div className="mx-auto w-full max-w-md flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <SignInForm key="signin" onSwitchToRegister={switchToRegister} />
            ) : (
              <RegisterForm key="register" onSwitchToLogin={switchToLogin} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Login