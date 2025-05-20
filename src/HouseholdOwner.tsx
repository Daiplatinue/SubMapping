import type React from "react"
import { useState, useEffect } from "react"
import {
  Home,
  Droplet,
  Zap,
  Users,
  AlertTriangle,
  FileText,
  Bell,
  Send,
  BarChart3,
  Phone,
  Map,
  Info,
  Eye,
  ChevronDown,
  Loader2,
  CheckCircle,
  CreditCard,
  Download,
  MapPin,
  Flag,
  Shield,
  Volume2,
  AlertOctagon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { householdData, type ConsumptionCardProps } from "./householdData"

import MapViewer from "../src/Household-Owner/MapViewOwner"

const API_BASE_URL = import.meta.env.VITE_API_URL

// Define the UserRequest interface
interface UserRequest {
  _id: string
  type: string
  desc: string
  date: string
  location: string
  priority: string
  requester: string
  createdAt: string
  status?: string // Adding status field which might be added later
}

// Define the UserReport interface
interface UserReport {
  _id: string
  type: string
  dateTime: string
  desc: string
  location: string
  witness: string
  severity: string
  requester: string
  createdAt: string
  status?: string // Adding status field which might be added later
}

const ConsumptionCard = ({
  icon,
  title,
  value,
  unit,
  change,
  color,
  payment,
  threshold,
  rate,
  exceededRate,
}: ConsumptionCardProps) => {
  const [showDetails, setShowDetails] = useState(false)
  const isIncrease = change > 0
  const isExceeded = value > threshold

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </div>
        <p className={`text-xs ${isIncrease ? "text-red-500" : "text-green-500"} flex items-center gap-1 mt-1`}>
          {isIncrease ? "↑" : "↓"} {Math.abs(change)}% from last month
        </p>

        <div className="mt-3 pt-3 border-t">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center p-2 text-sm"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            <span>View Payment Details</span>
            <span className="font-bold">{showDetails ? "Hide" : "Show"}</span>
          </Button>

          {showDetails && (
            <div className="mt-2 p-3 border rounded-md bg-background/95 animate-in fade-in-50 duration-200">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Payment:</span>
                <span className="font-bold">₱{payment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">Rate:</span>
                <span className="text-xs">
                  ₱{rate}/unit{" "}
                  {isExceeded && (
                    <span className="text-red-500">
                      ↑ ₱{exceededRate}/unit over {threshold}
                    </span>
                  )}
                </span>
              </div>

              {isExceeded && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                  Usage exceeds threshold of {threshold} {unit.split("/")[0]}. Higher rate applied.
                </div>
              )}

              <Button className="w-full mt-3 text-sm" size="sm">
                Pay Online Now
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const RequestCard = ({
  item,
  type = "request",
}: {
  item: UserRequest | UserReport | { id: number; type: string; status: string; date: string; description: string }
  type?: "request" | "incident"
}) => {
  const isApiData = "_id" in item

  let requestType, status, date, description, location, priority, severity, witness

  if (isApiData) {
    if ("dateTime" in item) {
      requestType = item.type
      status = item.status || "Pending"
      date = new Date(item.dateTime).toLocaleDateString()
      description = item.desc
      location = item.location
      severity = item.severity
      witness = item.witness
    } else {
      requestType = item.type
      status = item.status || "Pending"
      date = new Date(item.date).toLocaleDateString()
      description = item.desc
      location = item.location
      priority = item.priority
    }
  } else {
    requestType = item.type
    status = item.status
    date = item.date
    description = item.description
  }

  const getTypeIcon = () => {
    if (type === "incident") {
      switch (requestType?.toLowerCase()) {
        case "security":
          return <Shield className="h-3 w-3" />
        case "noise":
          return <Volume2 className="h-3 w-3" />
        case "property":
          return <Home className="h-3 w-3" />
        default:
          return <AlertOctagon className="h-3 w-3" />
      }
    }
    return null
  }

  return (
    <Card className="mb-3">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium capitalize">{requestType}</CardTitle>
            <Badge variant={status === "Pending" ? "outline" : status === "Completed" ? "default" : "secondary"}>
              {status}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
        {isApiData && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
            {type === "request" && priority && (
              <div className="flex items-center gap-1">
                <Flag className="h-3 w-3" />
                <span className="capitalize">Priority: {priority}</span>
              </div>
            )}
            {type === "incident" && severity && (
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span className="capitalize">Severity: {severity}</span>
              </div>
            )}
            {type === "incident" && witness && (
              <div className="flex items-center gap-1">
                {getTypeIcon()}
                <span className="capitalize">
                  {type === "incident" ? "Witness: " : ""}
                  {witness}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="ml-auto">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

const OnlinePaymentDialog = ({ setActiveTab, userId }: { setActiveTab: (value: string) => void; userId: string }) => {
  const [paymentType, setPaymentType] = useState("utilities")
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(4440)
  const [processingFee, setProcessingFee] = useState(20)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  // Generate a randomized payment amount based on user ID
  useEffect(() => {
    // Use the userId to create a deterministic but seemingly random amount
    const userIdSum = userId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const baseAmount = 4000 + (userIdSum % 2000) // Between 4000 and 6000
    setPaymentAmount(Math.round(baseAmount / 10) * 10) // Round to nearest 10

    // Also randomize the processing fee slightly
    setProcessingFee(15 + (userIdSum % 10))
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setCardDetails((prev) => ({
      ...prev,
      [id.replace("card-", "")]: value,
    }))
  }

  const getPaymentAmount = () => {
    switch (paymentType) {
      case "utilities":
        return paymentAmount
      case "water":
        return Math.round(paymentAmount * 0.4)
      case "electricity":
        return Math.round(paymentAmount * 0.6)
      case "association":
        return 500
      default:
        return paymentAmount
    }
  }

  const getTotalAmount = () => {
    return getPaymentAmount() + processingFee
  }

  const handleProcessPayment = async () => {
    setIsProcessing(true)

    try {
      // Create payment data object
      const paymentData = {
        userId,
        houseId: householdData.id,
        paymentType,
        amount: getPaymentAmount(),
        processingFee,
        totalAmount: getTotalAmount(),
        cardDetails: {
          cardNumber: cardDetails.cardNumber,
          expiryDate: cardDetails.expiryDate,
          nameOnCard: cardDetails.nameOnCard,
        },
        transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
        paymentDate: new Date().toISOString(),
      }

      // Post to MongoDB
      await axios.post(`${API_BASE_URL}/postPayment`, paymentData)

      // Simulate processing delay
      setTimeout(() => {
        setIsProcessing(false)
        setIsSuccess(true)

        // Store payment in localStorage for immediate display
        const existingPayments = JSON.parse(localStorage.getItem("payments") || "[]")
        localStorage.setItem("payments", JSON.stringify([paymentData, ...existingPayments]))

        setTimeout(() => {
          setIsSuccess(false)
          setIsOpen(false)
          setActiveTab("payment-logs")
        }, 3000)
      }, 2000)
    } catch (error) {
      console.error("Payment processing error:", error)
      setIsProcessing(false)
      // You could add error handling UI here
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Pay Online</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Online Payment</DialogTitle>
            <DialogDescription>Complete your payment securely online.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger id="payment-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utilities">Utilities (₱{getPaymentAmount().toLocaleString()})</SelectItem>
                  <SelectItem value="water">
                    Water Only (₱{Math.round(paymentAmount * 0.4).toLocaleString()})
                  </SelectItem>
                  <SelectItem value="electricity">
                    Electricity Only (₱{Math.round(paymentAmount * 0.6).toLocaleString()})
                  </SelectItem>
                  <SelectItem value="association">Association Dues (₱500)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm">Amount to Pay:</span>
                <span className="font-bold">₱{getPaymentAmount().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">Processing Fee:</span>
                <span className="text-xs">₱{processingFee.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total:</span>
                <span className="font-bold">₱{getTotalAmount().toLocaleString()}</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-cardNumber">Card Number</Label>
              <Input
                id="card-cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-expiryDate">Expiry Date</Label>
                <Input
                  id="card-expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="card-cvv">CVV</Label>
                <Input id="card-cvv" placeholder="123" value={cardDetails.cvv} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="card-nameOnCard">Name on Card</Label>
              <Input
                id="card-nameOnCard"
                placeholder="John Doe"
                value={cardDetails.nameOnCard}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" onClick={handleProcessPayment} disabled={isProcessing}>
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processing Payment...
                </div>
              ) : (
                "Process Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-center text-muted-foreground mb-4">
              Your payment has been processed successfully. A receipt has been sent to your email.
            </p>
            <div className="p-4 bg-green-50 border border-green-100 rounded-md w-full mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Transaction ID:</span>
                <span className="font-medium">TXN-{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">Amount:</span>
                <span className="font-bold">₱{getTotalAmount().toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground">Redirecting to payment logs...</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// New component for viewing payment receipts
const ViewReceiptDialog = ({ payment }: { payment: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
          View Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Receipt</DialogTitle>
          <DialogDescription>
            Transaction ID: {payment.transactionId || `TXN-${Math.floor(Math.random() * 1000000)}`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-4 border rounded-md bg-muted/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Payment Type:</span>
              <span className="font-medium capitalize">{payment.paymentType || "Utilities"}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Date:</span>
              <span>
                {payment.paymentDate
                  ? new Date(payment.paymentDate).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Amount:</span>
              <span>₱{payment.amount?.toLocaleString() || payment.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Processing Fee:</span>
              <span>₱{payment.processingFee?.toFixed(2) || "20.00"}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total:</span>
              <span className="font-bold">
                ₱{payment.totalAmount?.toLocaleString() || (payment.amount + 20).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <h3 className="text-sm font-medium mb-2">Payment Method</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Card Number:</span>
                <span>**** **** **** {payment.cardDetails?.cardNumber?.slice(-4) || "4321"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Expiry Date:</span>
                <span>{payment.cardDetails?.expiryDate || "12/25"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Name on Card:</span>
                <span>{payment.cardDetails?.nameOnCard || "John Doe"}</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function HouseholdOwner() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showDashboardDetails, setShowDashboardDetails] = useState(false)
  const [emergencySubmitted, setEmergencySubmitted] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [payments, setPayments] = useState<any[]>([])
  const [fetchingPayments, setFetchingPayments] = useState(false)
  const [userRequests, setUserRequests] = useState<UserRequest[]>([])
  const [userReports, setUserReports] = useState<UserReport[]>([])
  const [fetchingRequests, setFetchingRequests] = useState(false)
  const [fetchingReports, setFetchingReports] = useState(false)

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const userId = user._id || "Not available"
  const userFirstname = user.firstname || "Not available"
  const userLastname = user.lastname || "Not available"

  const [values, setValues] = useState({
    type: "",
    description: "",
    contact: "",
    requester: userId,
    houseId: householdData.id,
  })

  const [requestValue, setRequestValue] = useState({
    type: "",
    desc: "",
    date: "",
    location: "",
    priority: "",
    requester: `${userId}`,
    houseId: householdData.id,
  })

  const [reportValue, setReportValue] = useState({
    type: "security",
    dateTime: "",
    desc: "",
    location: "",
    witness: "",
    severity: "medium",
    requester: `${userId}`,
    houseId: householdData.id,
  })

  // Load payments from localStorage on component mount
  useEffect(() => {
    const storedPayments = localStorage.getItem("payments")
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments))
    }
  }, [])

  // Fetch user requests and reports when component mounts or when activeTab changes to "requests"
  useEffect(() => {
    if (activeTab === "requests" && userId !== "Not available") {
      fetchUserRequests()
      fetchUserReports()
    }
  }, [activeTab, userId])

  // Fetch user requests after a new request is submitted
  useEffect(() => {
    if (requestSubmitted && userId !== "Not available") {
      fetchUserRequests()
    }
  }, [requestSubmitted])

  // Fetch user reports after a new report is submitted
  useEffect(() => {
    if (reportSubmitted && userId !== "Not available") {
      fetchUserReports()
    }
  }, [reportSubmitted])

  // Fetch payment history when component mounts or when activeTab changes to "payment-logs"
  useEffect(() => {
    if (activeTab === "payment-logs" && userId !== "Not available") {
      fetchPaymentHistory()
    }
  }, [activeTab, userId])

  // Function to fetch user requests from the API
  const fetchUserRequests = async () => {
    setFetchingRequests(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/requests/${userId}`)
      if (response.data) {
        setUserRequests(response.data)
      }
    } catch (error) {
      console.error("Error fetching user requests:", error)
    } finally {
      setFetchingRequests(false)
    }
  }

  // Function to fetch user reports from the API
  const fetchUserReports = async () => {
    setFetchingReports(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/${userId}`)
      if (response.data) {
        setUserReports(response.data)
      }
    } catch (error) {
      console.error("Error fetching user reports:", error)
    } finally {
      setFetchingReports(false)
    }
  }

  // Function to fetch payment history from the API
  const fetchPaymentHistory = async () => {
    try {
      setFetchingPayments(true)
      const response = await axios.get(`${API_BASE_URL}/payments/${userId}`)
      if (response.data) {
        setPayments(response.data)
        // Also store in localStorage for immediate access
        localStorage.setItem("payments", JSON.stringify(response.data))
      }
    } catch (error) {
      console.error("Error fetching payment history:", error)
    } finally {
      setFetchingPayments(false)
    }
  }

  const handleRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setRequestValue((prev) => ({
      ...prev,
      [id.replace("request-", "")]: value,
    }))
  }

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setReportValue((prev) => ({
      ...prev,
      [id.replace("incident-", "")]: value,
    }))
  }

  const handleReportSelectChange = (fieldName: string, value: string) => {
    setReportValue((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSelectChange = (fieldName: string, value: string) => {
    setRequestValue((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!reportValue.type) {
        setError("Please select an incident type")
        setLoading(false)
        return
      }

      if (!reportValue.dateTime) {
        setError("Please provide date and time")
        setLoading(false)
        return
      }

      if (!reportValue.desc) {
        setError("Please provide a description")
        setLoading(false)
        return
      }

      if (!reportValue.location) {
        setError("Please provide a location")
        setLoading(false)
        return
      }

      if (!reportValue.witness) {
        setError("Please provide witness information")
        setLoading(false)
        return
      }

      if (!reportValue.severity) {
        setError("Please select a severity level")
        setLoading(false)
        return
      }

      console.log("Submitting report:", reportValue)

      const response = await axios.post(`${API_BASE_URL}/postReport`, {
        type: reportValue.type,
        dateTime: reportValue.dateTime,
        desc: reportValue.desc,
        location: reportValue.location,
        witness: reportValue.witness,
        severity: reportValue.severity,
        requester: reportValue.requester,
        houseId: reportValue.houseId,
      })

      if (response.data) {
        localStorage.setItem("report", JSON.stringify(response.data))
        setReportValue({
          type: "security",
          dateTime: "",
          desc: "",
          location: "",
          witness: "",
          severity: "medium",
          requester: `${userId}`,
          houseId: householdData.id,
        })
        setReportSubmitted(true)
      }
    } catch (error: any) {
      console.error("Report submission error:", error)
      setError(error.response?.data?.message || "Connection error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!requestValue.type) {
        setError("Please select a request type")
        setLoading(false)
        return
      }

      if (!requestValue.desc) {
        setError("Please provide a description")
        setLoading(false)
        return
      }

      if (!requestValue.date) {
        setError("Please provide a date")
        setLoading(false)
        return
      }

      if (!requestValue.location) {
        setError("Please provide a location")
        setLoading(false)
        return
      }

      if (!requestValue.priority) {
        setError("Please select a priority level")
        setLoading(false)
        return
      }

      console.log("Submitting request:", requestValue)

      const response = await axios.post(`${API_BASE_URL}/postRequest`, {
        type: requestValue.type,
        desc: requestValue.desc,
        date: requestValue.date,
        location: requestValue.location,
        priority: requestValue.priority,
        requester: requestValue.requester,
        houseId: requestValue.houseId,
      })

      if (response.data) {
        localStorage.setItem("request", JSON.stringify(response.data))
        setRequestValue({
          type: "",
          desc: "",
          date: "",
          location: "",
          priority: "",
          requester: `${userId}`,
          houseId: householdData.id,
        })
        setRequestSubmitted(true)
      }
    } catch (error: any) {
      console.error("Request submission error:", error)
      setError(error.response?.data?.message || "Connection error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleEmergency = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!values.type) {
        setError("Please select an emergency type")
        setLoading(false)
        return
      }

      if (!values.description) {
        setError("Please provide a description")
        setLoading(false)
        return
      }

      if (!values.contact) {
        setError("Please provide a contact number")
        setLoading(false)
        return
      }

      console.log("Submitting emergency:", values)

      const response = await axios.post(`${API_BASE_URL}/postEmergency`, {
        type: values.type,
        description: values.description,
        contact: values.contact,
        requester: values.requester,
        houseId: values.houseId,
      })

      if (response.data) {
        localStorage.setItem("emergency", JSON.stringify(response.data))
        setValues({
          type: "",
          description: "",
          contact: "",
          requester: userId,
          houseId: householdData.id,
        })
        setEmergencySubmitted(true)
      }
    } catch (error: any) {
      console.error("Emergency submission error:", error)
      setError(error.response?.data?.message || "Connection error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const waterChange =
    ((householdData.waterConsumption.current - householdData.waterConsumption.previous) /
      householdData.waterConsumption.previous) *
    100
  const electricityChange =
    ((householdData.electricityConsumption.current - householdData.electricityConsumption.previous) /
      householdData.electricityConsumption.previous) *
    100

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Subdivision Mapping</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10">
              User ID: {userId}
            </Badge>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-4">
          <div className="flex-1 flex items-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <TabsList className="h-auto p-1">
                    <div className="grid grid-cols-3 md:grid-cols-7 gap-1">
                      <TabsTrigger value="dashboard" className="px-3 py-1.5">
                        <BarChart3 className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Dashboard</span>
                      </TabsTrigger>
                      <TabsTrigger value="requests" className="px-3 py-1.5">
                        <Send className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Requests</span>
                      </TabsTrigger>
                      <TabsTrigger value="house" className="px-3 py-1.5">
                        <Home className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">House</span>
                      </TabsTrigger>
                      <TabsTrigger value="emergency" className="px-3 py-1.5">
                        <AlertTriangle className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Emergency</span>
                      </TabsTrigger>
                      <TabsTrigger value="new-request" className="px-3 py-1.5">
                        <FileText className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">New Request</span>
                      </TabsTrigger>
                      <TabsTrigger value="report" className="px-3 py-1.5">
                        <Bell className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Report</span>
                      </TabsTrigger>
                      <TabsTrigger value="payment-logs" className="px-3 py-1.5">
                        <FileText className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                        <span className="hidden md:hidden lg:inline">Payments</span>
                      </TabsTrigger>
                    </div>
                  </TabsList>

                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4 gap-2"
                    onClick={() => setShowDashboardDetails(!showDashboardDetails)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {showDashboardDetails ? "Hide Consumptions" : "Show Consumptions"}
                    </span>
                  </Button>
                </div>

                {/* Dashboard Details Panel */}
                {showDashboardDetails && (
                  <div className="p-4 border rounded-lg animate-in fade-in-50 duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Household Dashboard</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                        onClick={() => setShowDashboardDetails(false)}
                      >
                        <span>Hide</span>
                        <ChevronDown className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <ConsumptionCard
                          icon={<Droplet className="h-4 w-4 text-white" />}
                          title="Water Consumption"
                          value={householdData.waterConsumption.current}
                          unit="m³/month"
                          change={waterChange}
                          color="bg-blue-500"
                          payment={householdData.waterPayment.current}
                          threshold={householdData.waterPayment.threshold}
                          rate={householdData.waterPayment.rate}
                          exceededRate={householdData.waterPayment.exceededRate}
                        />
                        <ConsumptionCard
                          icon={<Zap className="h-4 w-4 text-white" />}
                          title="Electricity Consumption"
                          value={householdData.electricityConsumption.current}
                          unit="kWh/month"
                          change={electricityChange}
                          color="bg-yellow-500"
                          payment={householdData.electricityPayment.current}
                          threshold={householdData.electricityPayment.threshold}
                          rate={householdData.electricityPayment.rate}
                          exceededRate={householdData.electricityPayment.exceededRate}
                        />
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Consumption History</CardTitle>
                          <CardDescription>Last 6 months of utility usage</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[200px] flex items-end justify-between gap-2">
                            {householdData.waterConsumption.history.map((value, index) => (
                              <div key={`water-${index}`} className="relative flex flex-col items-center">
                                <div
                                  className="w-8 bg-blue-500 rounded-t-sm"
                                  style={{ height: `${(value / 200) * 150}px` }}
                                ></div>
                                <div
                                  className="w-8 bg-yellow-500 rounded-t-sm absolute bottom-0 left-0 z-10"
                                  style={{
                                    height: `${(householdData.electricityConsumption.history[index] / 250) * 150}px`,
                                    opacity: 0.7,
                                  }}
                                ></div>
                                <span className="text-xs mt-1">M{index + 1}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center mt-4 gap-6">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                              <span className="text-xs">Water</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                              <span className="text-xs">Electricity</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-8">
                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10"></div>
                    <div className="relative z-10">
                      <div className="grid gap-4 md:grid-cols-2 items-center">
                        <div>
                          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Subdivision Mapping</h1>
                          <p className="text-muted-foreground mb-4">
                            Your comprehensive solution for managing and visualizing community resources, utilities, and
                            services in your neighborhood.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <OnlinePaymentDialog setActiveTab={setActiveTab} userId={userId} />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="relative w-full max-w-sm aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative h-full flex items-center justify-center">
                              <Map className="h-32 w-32 text-primary" strokeWidth={1} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Mapping</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Interactive maps of your subdivision with detailed information about facilities, services, and
                          infrastructure.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-2">
                          <Map className="h-4 w-4" />
                          Explore Map
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Utility Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Track and manage your household utilities including water, electricity, and waste management
                          services.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-2">
                          <Zap className="h-4 w-4" />
                          View Utilities
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Services</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Access community services, report incidents, and stay connected with your neighborhood.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-2">
                          <Users className="h-4 w-4" />
                          Community Hub
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Features</CardTitle>
                      <CardDescription>Discover what Subdivision Mapping can do for you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Map className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Interactive Mapping</h3>
                            <p className="text-sm text-muted-foreground">
                              Visualize your community with interactive maps showing facilities, services, and
                              infrastructure.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Droplet className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Utility Tracking</h3>
                            <p className="text-sm text-muted-foreground">
                              Monitor water and electricity usage with detailed analytics and payment management.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Incident Reporting</h3>
                            <p className="text-sm text-muted-foreground">
                              Report and track community incidents, maintenance requests, and security concerns.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Community Engagement</h3>
                            <p className="text-sm text-muted-foreground">
                              Connect with neighbors, access community resources, and participate in local events.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        <Info className="h-4 w-4" />
                        Learn More About Our System
                      </Button>
                    </CardFooter>
                    <MapViewer />
                  </Card>
                </TabsContent>

                {/* Requests Tab */}
                <TabsContent value="requests" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Requests & Incidents</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        fetchUserRequests()
                        fetchUserReports()
                      }}
                      disabled={fetchingRequests || fetchingReports}
                    >
                      {fetchingRequests || fetchingReports ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      )}
                      <span>Refresh</span>
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-red-100 rounded-full">
                            <Phone className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <p className="font-medium">Community Emergency Line</p>
                            <p className="text-sm text-muted-foreground">Available 24/7</p>
                          </div>
                        </div>
                        <Button variant="destructive">Call Now</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-3">My Requests</h3>
                      {fetchingRequests ? (
                        <Card>
                          <CardContent className="py-8 flex justify-center items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Loading your requests...</span>
                            </div>
                          </CardContent>
                        </Card>
                      ) : userRequests.length > 0 ? (
                        userRequests.map((request) => (
                          <RequestCard key={`user-request-${request._id}`} item={request} type="request" />
                        ))
                      ) : (
                        <Card>
                          <CardContent className="py-8 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <FileText className="h-10 w-10 text-muted-foreground/50" />
                              <p>No requests found</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setActiveTab("new-request")}
                              >
                                Create New Request
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Reported Incidents</h3>
                      {fetchingReports ? (
                        <Card>
                          <CardContent className="py-8 flex justify-center items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Loading your incident reports...</span>
                            </div>
                          </CardContent>
                        </Card>
                      ) : userReports.length > 0 ? (
                        userReports.map((report) => (
                          <RequestCard key={`user-report-${report._id}`} item={report} type="incident" />
                        ))
                      ) : (
                        <Card>
                          <CardContent className="py-8 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <Bell className="h-10 w-10 text-muted-foreground/50" />
                              <p>No incidents reported</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setActiveTab("report")}
                              >
                                Report an Incident
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* House Details Tab */}
                <TabsContent value="house" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>House Information</CardTitle>
                      <CardDescription>
                        {householdData.address}, Block {householdData.blockNumber}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <img
                            src="https://cdn.pixabay.com/photo/2022/03/19/02/04/building-7077718_1280.jpg"
                            alt="House"
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Block</span>
                              <span className="font-medium">{householdData.blockNumber}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">House ID</span>
                              <span className="font-medium">{householdData.id}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Year Built</span>
                              <span className="font-medium">{householdData.yearBuilt}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Occupants</span>
                              <span className="font-medium">{householdData.occupants}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Address</h3>
                            <p className="text-muted-foreground">{householdData.address}</p>
                            <p className="text-muted-foreground">{householdData.blockName}</p>
                            <p className="text-muted-foreground">Deca Homes Tunghaan Subdivision</p>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-sm font-medium mb-2">Utilities</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Water Meter ID</span>
                                <span>WM-{householdData.id}-2010</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Electric Meter ID</span>
                                <span>EM-{householdData.id}-2010</span>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-sm font-medium mb-2">Community</h3>
                            <p className="text-muted-foreground">
                              Part of {householdData.blockName}, established in {householdData.yearBuilt}.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Occupants</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {userFirstname}, {userLastname}
                              </p>
                              <p className="text-xs text-muted-foreground">Primary Resident</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {userFirstname}, {userLastname}
                              </p>
                              <p className="text-xs text-muted-foreground">Members</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Droplet className="h-4 w-4 text-blue-500" />
                              <span>Water Bill</span>
                            </div>
                            <Badge variant="outline" className="bg-green-50">
                              Paid
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              <span>Electricity Bill</span>
                            </div>
                            <Badge variant="outline" className="bg-green-50">
                              Paid
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-primary" />
                              <span>Association Dues</span>
                            </div>
                            <Badge variant="outline" className="bg-yellow-50">
                              Due in 5 days
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <Button variant="outline">View History</Button>
                            <OnlinePaymentDialog setActiveTab={setActiveTab} userId={userId} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Emergency Request Tab */}
                <TabsContent value="emergency" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Emergency Request</h2>
                    <Badge variant="destructive">Urgent</Badge>
                  </div>

                  {emergencySubmitted ? (
                    <Card className="border-green-200">
                      <CardHeader className="bg-green-50 border-b border-green-100">
                        <CardTitle className="text-green-700 flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Emergency Request Submitted
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Your emergency request has been sent successfully to the community management team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="text-green-800 text-sm">
                            The management team has been notified and will respond promptly. If immediate assistance is
                            needed, please use the emergency contact below.
                          </p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-full">
                              <Phone className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Community Emergency Line</p>
                              <p className="text-sm text-muted-foreground">Available 24/7</p>
                            </div>
                          </div>
                          <Button variant="destructive">Call Now</Button>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => setEmergencySubmitted(false)}>
                          Submit Another Request
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card className="border-red-200">
                      <CardHeader className="bg-red-50 border-b border-red-100">
                        <CardTitle className="text-red-700 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Submit Emergency Request
                        </CardTitle>
                        <CardDescription className="text-red-600">
                          This will be sent immediately to the community management team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <form onSubmit={handleEmergency}>
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="emergency-type">Emergency Type</Label>
                              <Select
                                name="type"
                                value={values.type}
                                onValueChange={(value) => setValues((prev) => ({ ...prev, type: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="medical">Medical Emergency</SelectItem>
                                  <SelectItem value="fire">Fire</SelectItem>
                                  <SelectItem value="security">Security Threat</SelectItem>
                                  <SelectItem value="utility">Critical Utility Failure</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="emergency-description">Brief Description</Label>
                              <Textarea
                                id="emergency-description"
                                name="description"
                                value={values.description}
                                onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe the emergency situation..."
                                className="min-h-[120px]"
                              />

                              <Input
                                id="contact-number"
                                name="contact"
                                value={values.contact}
                                onChange={(e) => setValues((prev) => ({ ...prev, contact: e.target.value }))}
                                placeholder="Your contact number"
                              />

                              {/* Hidden input with requester info */}
                              <Input type="hidden" name="requester" value={values.requester} />
                            </div>

                            {error && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                                <AlertTriangle className="h-4 w-4 inline mr-2" />
                                {error}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-4 mt-6">
                            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={loading}>
                              {loading ? (
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                  Submitting...
                                </div>
                              ) : (
                                "Submit Emergency Request"
                              )}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter className="block">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-full">
                              <Phone className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">Community Emergency Line</p>
                              <p className="text-sm text-muted-foreground">Available 24/7</p>
                            </div>
                          </div>
                          <Button variant="destructive">Call Now</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  )}
                </TabsContent>

                {/* New Request Tab */}
                <TabsContent value="new-request" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Submit New Request</h2>
                  </div>

                  {requestSubmitted ? (
                    <Card className="border-green-200">
                      <CardHeader className="bg-green-50 border-b border-green-100">
                        <CardTitle className="text-green-700 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Request Submitted Successfully
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Your request has been sent to the management team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="text-green-800 text-sm">
                            The management team will review your request and take appropriate action. You can check the
                            status of your request in the "Requests" tab.
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => setRequestSubmitted(false)}>
                          Submit Another Request
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          New Request Form
                        </CardTitle>
                        <CardDescription>Fill out the form to submit a new request to the management.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <form onSubmit={handleRequest}>
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="request-type">Request Type</Label>
                              <Select
                                value={requestValue.type}
                                onValueChange={(value) => handleSelectChange("type", value)}
                              >
                                <SelectTrigger id="request-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="maintenance">Maintenance</SelectItem>
                                  <SelectItem value="utility">Utility</SelectItem>
                                  <SelectItem value="community">Community</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="request-desc">Description</Label>
                              <Textarea
                                id="request-desc"
                                placeholder="Describe your request..."
                                className="min-h-[120px]"
                                value={requestValue.desc}
                                onChange={handleRequestChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="request-date">Preferred Date (if applicable)</Label>
                              <Input
                                id="request-date"
                                type="date"
                                value={requestValue.date}
                                onChange={handleRequestChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="request-location">Location</Label>
                              <Input
                                id="request-location"
                                placeholder="Where is this request for?"
                                value={requestValue.location}
                                onChange={handleRequestChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="request-priority">Priority</Label>
                              <Select
                                value={requestValue.priority}
                                onValueChange={(value) => handleSelectChange("priority", value)}
                              >
                                <SelectTrigger id="request-priority">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="normal">Normal</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="request-requester">Requester</Label>
                              <Input
                                id="request-requester"
                                value={requestValue.requester}
                                disabled
                                className="bg-gray-50"
                              />
                            </div>

                            {error && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                                <AlertTriangle className="h-4 w-4 inline mr-2" />
                                {error}
                              </div>
                            )}
                          </div>

                          <div className="flex mt-6">
                            <Button type="submit" className="w-full" disabled={loading}>
                              {loading ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Submitting...
                                </div>
                              ) : (
                                "Submit Request"
                              )}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Report Incident Tab */}
                <TabsContent value="report" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Report an Incident</h2>
                  </div>

                  {reportSubmitted ? (
                    <Card className="border-green-200">
                      <CardHeader className="bg-green-50 border-b border-green-100">
                        <CardTitle className="text-green-700 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Incident Report Submitted Successfully
                        </CardTitle>
                        <CardDescription className="text-green-600">
                          Your incident report has been sent to the management team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="text-green-800 text-sm">
                            The management team will review your report and take appropriate action. You can check the
                            status of your report in the "Requests" tab.
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => setReportSubmitted(false)}>
                          Report Another Incident
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          Incident Report Form
                        </CardTitle>
                        <CardDescription>Report any incidents or issues in the community.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <form onSubmit={handleReport}>
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="incident-type">Incident Type</Label>
                              <Select
                                value={reportValue.type}
                                onValueChange={(value) => handleReportSelectChange("type", value)}
                              >
                                <SelectTrigger id="incident-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="security">Security</SelectItem>
                                  <SelectItem value="noise">Noise Complaint</SelectItem>
                                  <SelectItem value="property">Property Damage</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="incident-dateTime">Date & Time of Incident</Label>
                              <Input
                                id="incident-dateTime"
                                type="datetime-local"
                                value={reportValue.dateTime}
                                onChange={handleReportChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="incident-desc">Description</Label>
                              <Textarea
                                id="incident-desc"
                                placeholder="Describe the incident..."
                                className="min-h-[120px]"
                                value={reportValue.desc}
                                onChange={handleReportChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="incident-location">Location</Label>
                              <Input
                                id="incident-location"
                                placeholder="Where did this happen?"
                                value={reportValue.location}
                                onChange={handleReportChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="incident-witness">Witnesses (if any)</Label>
                              <Input
                                id="incident-witness"
                                placeholder="Names of any witnesses"
                                value={reportValue.witness}
                                onChange={handleReportChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="incident-severity">Severity</Label>
                              <Select
                                value={reportValue.severity}
                                onValueChange={(value) => handleReportSelectChange("severity", value)}
                              >
                                <SelectTrigger id="incident-severity">
                                  <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {error && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                                <AlertTriangle className="h-4 w-4 inline mr-2" />
                                {error}
                              </div>
                            )}
                          </div>

                          <div className="flex mt-6">
                            <Button type="submit" className="w-full" disabled={loading}>
                              {loading ? (
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Submitting Report...
                                </div>
                              ) : (
                                "Submit Report"
                              )}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Payment Logs Tab */}
                <TabsContent value="payment-logs" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Payment History</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={fetchPaymentHistory}
                        disabled={fetchingPayments}
                      >
                        {fetchingPayments ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        )}
                        <span>Refresh</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Download All Receipts
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex flex-col w-full justify-center items-center gap-3">
                        <CardTitle>Recent Payments</CardTitle>
                        <CardDescription>View and manage your payment history</CardDescription>
                        <OnlinePaymentDialog setActiveTab={setActiveTab} userId={userId} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Display stored payments */}
                        {payments.length > 0 &&
                          payments.map((payment, index) => (
                            <div
                              key={`new-payment-${index}`}
                              className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-100"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-green-100">
                                  <CreditCard className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {payment.paymentDate
                                      ? new Date(payment.paymentDate).toLocaleDateString()
                                      : new Date().toLocaleDateString()}
                                    {index === 0 && <Badge className="ml-2 bg-green-500">New</Badge>}
                                  </p>
                                  <p className="text-sm text-muted-foreground capitalize">
                                    {payment.paymentType} Payment
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">₱{payment.totalAmount?.toLocaleString()}</p>
                                <div className="flex gap-2 mt-1">
                                  <ViewReceiptDialog payment={payment} />
                                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}

                        {/* Existing payments */}
                        {householdData.paymentLogs.map((payment) => (
                          <div
                            key={`payment-log-${payment.id}`}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${payment.type === "Utilities" ? "bg-primary/10" : "bg-gray-100"}`}
                              >
                                {payment.type === "Utilities" ? (
                                  <Home className="h-5 w-5 text-primary" />
                                ) : (
                                  <Home className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{payment.date}</p>
                                <p className="text-sm text-muted-foreground">{payment.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₱{payment.amount.toLocaleString()}</p>
                              <div className="flex gap-2 mt-1">
                                <ViewReceiptDialog payment={payment} />
                                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {payments.length === 0 && householdData.paymentLogs.length === 0 && (
                          <div className="p-8 text-center text-muted-foreground border rounded-lg">
                            No payment history found. Make your first payment now.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Total Payments (2024)</span>
                            <span className="font-bold">₱12,570.00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average Monthly Payment</span>
                            <span className="font-bold">₱4,190.00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Next Payment Due</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">₱500.00</span>
                              <Badge variant="outline" className="bg-yellow-50">
                                Due in 5 days
                              </Badge>
                            </div>
                          </div>
                          <Separator />
                          <div className="pt-2">
                            <Button variant="outline" className="w-full">
                              Set Up Automatic Payments
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-blue-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Credit Card</p>
                                <p className="text-xs text-muted-foreground">**** **** **** 4321</p>
                              </div>
                            </div>
                            <Badge>Default</Badge>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-green-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">E-Wallet</p>
                                <p className="text-xs text-muted-foreground">Connected Account</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Use
                            </Button>
                          </div>

                          <Button className="w-full">Add Payment Method</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HouseholdOwner