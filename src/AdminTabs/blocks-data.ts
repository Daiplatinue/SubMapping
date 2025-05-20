// Define types for our data
export type Block = {
  id: string
  name: string
  totalHouseholds: number
  waterConsumption: number
  electricityConsumption: number
  incidents: number
  underRenovation: number
  upcomingRenovation: number
  underConstruction: number
}

export type Household = {
  id: string
  blockId: string
  address: string
  occupants: number
  waterConsumption: number
  electricityConsumption: number
  status: string
  paymentStatus: string
}

// Create a function to generate default households for each block
const generateDefaultHouseholds = (blockId: string): Household[] => {
  return Array.from({ length: 10 }, (_, i) => {
    const num = i + 1
    const id = `${blockId}${num}`

    return {
      id,
      blockId,
      address: `${id} Sugbo St`,
      occupants: 0,
      waterConsumption: 0,
      electricityConsumption: 0,
      status: "Available",
      paymentStatus: "N/A",
    }
  })
}

// Create blocks with default data
export const blocksData: Block[] = [
  {
    id: "A",
    name: "Block A",
    totalHouseholds: 10,
    waterConsumption: 0,
    electricityConsumption: 0,
    incidents: 0,
    underRenovation: 0,
    upcomingRenovation: 0,
    underConstruction: 0,
  },
  {
    id: "B",
    name: "Block B",
    totalHouseholds: 10,
    waterConsumption: 0,
    electricityConsumption: 0,
    incidents: 0,
    underRenovation: 0,
    upcomingRenovation: 0,
    underConstruction: 0,
  },
  {
    id: "C",
    name: "Block C",
    totalHouseholds: 10,
    waterConsumption: 0,
    electricityConsumption: 0,
    incidents: 0,
    underRenovation: 0,
    upcomingRenovation: 0,
    underConstruction: 0,
  },
  {
    id: "D",
    name: "Block D",
    totalHouseholds: 10,
    waterConsumption: 0,
    electricityConsumption: 0,
    incidents: 0,
    underRenovation: 0,
    upcomingRenovation: 0,
    underConstruction: 0,
  },
]

// Generate default households for each block
export const householdsData: Household[] = [
  ...generateDefaultHouseholds("A"),
  ...generateDefaultHouseholds("B"),
  ...generateDefaultHouseholds("C"),
  ...generateDefaultHouseholds("D"),
]

// Update some households with sample data to make the dashboard more realistic
const sampleHouseholds: Partial<Household>[] = [
  {
    id: "A1",
    occupants: 4,
    waterConsumption: 180,
    electricityConsumption: 220,
    status: "Occupied",
    paymentStatus: "Paid",
  },
  {
    id: "A2",
    occupants: 3,
    waterConsumption: 150,
    electricityConsumption: 190,
    status: "Under Renovation",
    paymentStatus: "Paid",
  },
  {
    id: "A3",
    occupants: 5,
    waterConsumption: 200,
    electricityConsumption: 240,
    status: "Occupied",
    paymentStatus: "Overdue",
  },
  {
    id: "B1",
    occupants: 4,
    waterConsumption: 170,
    electricityConsumption: 210,
    status: "Upcoming Renovation",
    paymentStatus: "Paid",
  },
  {
    id: "B2",
    occupants: 2,
    waterConsumption: 120,
    electricityConsumption: 160,
    status: "Under Renovation",
    paymentStatus: "Paid",
  },
  {
    id: "C1",
    occupants: 6,
    waterConsumption: 220,
    electricityConsumption: 280,
    status: "Under Construction",
    paymentStatus: "N/A",
  },
  {
    id: "D1",
    occupants: 0,
    waterConsumption: 0,
    electricityConsumption: 0,
    status: "Upcoming Construction",
    paymentStatus: "N/A",
  },
]

// Apply the sample data to our households
export const initialHouseholdsData = householdsData.map((household) => {
  const sample = sampleHouseholds.find((sample) => sample.id === household.id)
  return sample ? { ...household, ...sample } : household
})

// Update block consumption data based on households
export const initialBlocksData = blocksData.map((block) => {
  const blockHouseholds = initialHouseholdsData.filter((h) => h.blockId === block.id)

  const waterConsumption = blockHouseholds.reduce((sum, h) => sum + h.waterConsumption, 0)
  const electricityConsumption = blockHouseholds.reduce((sum, h) => sum + h.electricityConsumption, 0)
  const underRenovation = blockHouseholds.filter((h) => h.status === "Under Renovation").length
  const upcomingRenovation = blockHouseholds.filter((h) => h.status === "Upcoming Renovation").length
  const underConstruction = blockHouseholds.filter((h) => h.status === "Under Construction").length

  return {
    ...block,
    waterConsumption,
    electricityConsumption,
    underRenovation,
    upcomingRenovation,
    underConstruction,
  }
})

// Other initial data
export const initialIncidentsData = [
  {
    id: 1,
    blockId: "A",
    householdId: "A3",
    type: "Security",
    description: "Suspicious person near house",
    date: "2024-03-10",
    status: "Resolved",
  },
  {
    id: 2,
    blockId: "B",
    householdId: "B1",
    type: "Maintenance",
    description: "Water pipe leakage affecting neighboring houses",
    date: "2024-03-12",
    status: "In Progress",
  },
  {
    id: 3,
    blockId: "A",
    householdId: "A2",
    type: "Noise",
    description: "Excessive noise from renovation",
    date: "2024-03-08",
    status: "Resolved",
  },
  {
    id: 4,
    blockId: "B",
    householdId: "B2",
    type: "Security",
    description: "Gate left open overnight",
    date: "2024-03-11",
    status: "Resolved",
  },
  {
    id: 5,
    blockId: "C",
    householdId: "C1",
    type: "Construction",
    description: "Construction debris not properly disposed",
    date: "2024-03-09",
    status: "In Progress",
  },
]

export const initialPaymentLogsData = [
  {
    id: 1,
    blockId: "A",
    householdId: "A1",
    type: "Utilities",
    amount: 4400,
    date: "2024-03-05",
    status: "Paid",
  },
  {
    id: 2,
    blockId: "A",
    householdId: "A2",
    type: "Utilities",
    amount: 3800,
    date: "2024-03-07",
    status: "Paid",
  },
  {
    id: 3,
    blockId: "A",
    householdId: "A3",
    type: "Utilities",
    amount: 4800,
    date: "2024-03-15",
    status: "Overdue",
  },
  {
    id: 4,
    blockId: "B",
    householdId: "B1",
    type: "Utilities",
    amount: 4200,
    date: "2024-03-06",
    status: "Paid",
  },
  {
    id: 5,
    blockId: "B",
    householdId: "B2",
    type: "Utilities",
    amount: 3200,
    date: "2024-03-08",
    status: "Paid",
  },
]

export const initialNewResidentsData = [
  {
    id: 1,
    name: "John Doe",
    householdId: "A4",
    moveInDate: "2024-03-01",
    previousAddress: "Cebu City",
    contactNumber: "09123456789",
  },
  {
    id: 2,
    name: "Jane Smith",
    householdId: "B3",
    moveInDate: "2024-03-05",
    previousAddress: "Mandaue City",
    contactNumber: "09987654321",
  },
  {
    id: 3,
    name: "Mark Johnson",
    householdId: "C2",
    moveInDate: "2024-03-10",
    previousAddress: "Lapu-Lapu City",
    contactNumber: "09456789123",
  },
]

export const initialSecurityAssignmentsData = [
  {
    id: 1,
    location: "Main Entrance",
    guard: "Robert Garcia",
    shift: "Morning (6AM-2PM)",
    status: "On Duty",
  },
  {
    id: 2,
    location: "Main Entrance",
    guard: "Michael Santos",
    shift: "Evening (2PM-10PM)",
    status: "On Duty",
  },
  {
    id: 3,
    location: "Main Entrance",
    guard: "James Rodriguez",
    shift: "Night (10PM-6AM)",
    status: "Off Duty",
  },
  {
    id: 4,
    location: "Exit 1",
    guard: "Carlos Reyes",
    shift: "Morning (6AM-2PM)",
    status: "On Duty",
  },
  {
    id: 5,
    location: "Exit 1",
    guard: "David Martinez",
    shift: "Evening (2PM-10PM)",
    status: "On Duty",
  },
  {
    id: 6,
    location: "Exit 2",
    guard: "Juan Dela Cruz",
    shift: "Morning (6AM-2PM)",
    status: "On Duty",
  },
  {
    id: 7,
    location: "Exit 2",
    guard: "Pedro Sanchez",
    shift: "Evening (2PM-10PM)",
    status: "On Duty",
  },
]

export const initialUsersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    middleName: "",
    email: "john.doe@example.com",
    referralCode: "REF001",
    blockId: "A",
    householdId: "A1",
    userType: "customer",
    contact: "REF001", // Added contact property
    status: "Active", // Added status property
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    middleName: "Marie",
    email: "jane.smith@example.com",
    referralCode: "REF002",
    blockId: "B",
    householdId: "B2",
    userType: "customer",
    contact: "REF002", // Added contact property
    status: "Active", // Added status property
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    middleName: "",
    email: "robert.johnson@example.com",
    referralCode: "REF003",
    blockId: "C",
    householdId: "C3",
    userType: "customer",
    contact: "REF003", // Added contact property
    status: "Active", // Added status property
  },
  {
    id: 4,
    firstName: "Robert",
    lastName: "Garcia",
    middleName: "",
    email: "robert.garcia@example.com",
    referralCode: "REF004",
    blockId: "",
    householdId: "",
    userType: "guard",
    contact: "REF004", // Added contact property
    status: "Active", // Added status property
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Santos",
    middleName: "",
    email: "michael.santos@example.com",
    referralCode: "REF005",
    blockId: "",
    householdId: "",
    userType: "guard",
    contact: "REF005", // Added contact property
    status: "Active", // Added status property
  },
  {
    id: 6,
    firstName: "James",
    lastName: "Rodriguez",
    middleName: "",
    email: "james.rodriguez@example.com",
    referralCode: "REF006",
    blockId: "",
    householdId: "",
    userType: "guard",
    contact: "REF006", // Added contact property
    status: "Active", // Added status property
  },
]