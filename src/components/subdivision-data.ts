// Types
export type StatusType =
  | "Occupied"
  | "Unoccupied"
  | "Under Renovation"
  | "Upcoming Renovation"
  | "Under Construction"
  | "Upcoming Construction"
  | "Renovation Paused"
  | "Construction Paused"
  | "Final Inspection"
  | "Permit Pending"
  | "Commercial"

// Helper function to get color based on status
export function getStatusColor(status: StatusType): string {
  switch (status) {
    case "Occupied":
      return "#10B981" // green
    case "Unoccupied":
      return "#10B981" // green (same as Occupied)
    case "Under Renovation":
      return "#F59E0B" // amber
    case "Upcoming Renovation":
      return "#3B82F6" // blue
    case "Under Construction":
      return "#EF4444" // red
    case "Upcoming Construction":
      return "#8B5CF6" // purple
    case "Renovation Paused":
      return "#FB923C" // orange
    case "Construction Paused":
      return "#FB7185" // rose
    case "Final Inspection":
      return "#14B8A6" // teal
    case "Permit Pending":
      return "#A78BFA" // violet
    default:
      return "#10B981" // default green
  }
}

// Add the getStatusVariant function after the getStatusColor function
export function getStatusVariant(status: StatusType): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Occupied":
      return "default"
    case "Unoccupied":
      return "default" // Same as Occupied (green)
    case "Under Renovation":
      return "destructive"
    case "Under Construction":
      return "destructive"
    case "Upcoming Renovation":
      return "secondary"
    case "Upcoming Construction":
      return "secondary"
    case "Renovation Paused":
      return "outline"
    case "Construction Paused":
      return "outline"
    case "Final Inspection":
      return "default"
    case "Permit Pending":
      return "secondary"
    default:
      return "outline"
  }
}

export type IncidentType = "Maintenance" | "Noise" | "Construction" | "Other"

export interface HouseProperties {
  id: string
  occupants: number
  status: {
    type: StatusType
    date: string
  }
  incidents: {
    type: IncidentType
    description: string
    date: string
  }[]
}

export interface PinProperties {
  id: string
  name: string
  blockNumber: string
  numberOfHouseholds: number
  totalResidents: number
  yearEstablished: number
  type: string
  houses: HouseProperties[]
}

// Security guard assignment data
export interface GuardAssignment {
  id: number
  name: string
  shift: string
  status: "On Duty" | "Off Duty"
  contactNumber: string
  email: string
  photo?: string
}

export interface SecurityEntrance {
  id: string
  name: string
  position: [number, number]
  guards: GuardAssignment[]
}

// Add the ResidenceData interface after the SecurityEntrance interface
export interface ResidenceData {
  id: string
  position: [number, number]
  name: string
  description: string
  occupants: number
  color?: string
}

// Security entrance points data
export const securityEntrances: SecurityEntrance[] = [
  {
    id: "exit1",
    name: "Exit 1",
    position: [10.250794, 123.787508],
    guards: [
      {
        id: 1,
        name: "John Smith",
        shift: "Morning (6AM-2PM)",
        status: "On Duty",
        contactNumber: "555-1234",
        email: "john.smith@example.com",
      },
      {
        id: 2,
        name: "Maria Garcia",
        shift: "Evening (2PM-10PM)",
        status: "On Duty",
        contactNumber: "555-2345",
        email: "maria.garcia@example.com",
      },
      {
        id: 3,
        name: "Robert Chen",
        shift: "Night (10PM-6AM)",
        status: "On Duty",
        contactNumber: "555-3456",
        email: "robert.chen@example.com",
      },
    ],
  },
  {
    id: "exit2",
    name: "Exit 2",
    position: [10.250815, 123.787685],
    guards: [
      {
        id: 4,
        name: "Sarah Johnson",
        shift: "Morning (6AM-2PM)",
        status: "On Duty",
        contactNumber: "555-4567",
        email: "sarah.johnson@example.com",
      },
      {
        id: 5,
        name: "Michael Brown",
        shift: "Evening (2PM-10PM)",
        status: "On Duty",
        contactNumber: "555-5678",
        email: "michael.brown@example.com",
      },
      {
        id: 6,
        name: "Lisa Wong",
        shift: "Night (10PM-6AM)",
        status: "On Duty",
        contactNumber: "555-6789",
        email: "lisa.wong@example.com",
      },
    ],
  },
  {
    id: "main-entrance",
    name: "Main Entrance",
    position: [10.248381, 123.791606],
    guards: [
      {
        id: 7,
        name: "David Martinez",
        shift: "Morning (6AM-2PM)",
        status: "On Duty",
        contactNumber: "555-7890",
        email: "david.martinez@example.com",
      },
      {
        id: 8,
        name: "Emily Taylor",
        shift: "Evening (2PM-10PM)",
        status: "On Duty",
        contactNumber: "555-8901",
        email: "emily.taylor@example.com",
      },
      {
        id: 9,
        name: "James Wilson",
        shift: "Night (10PM-6AM)",
        status: "On Duty",
        contactNumber: "555-9012",
        email: "james.wilson@example.com",
      },
    ],
  },
]

// Add the customPins array after the securityEntrances array
export const customPins: ResidenceData[] = [
  {
    id: "res001",
    position: [10.2492, 123.787546],
    name: "Johnson Residence",
    description:
      "A family of 4 that moved in early 2023. They're known for their beautiful garden and community involvement.",
    occupants: 4,
  },
  {
    id: "res002",
    position: [10.24949, 123.787481],
    name: "Williams Residence",
    description:
      "A wealthy family of 5 that relocated from the city center in 2022. They host regular neighborhood gatherings.",
    occupants: 5,
  },
  {
    id: "res003",
    position: [10.249738, 123.787411],
    name: "Chen Residence",
    description:
      "A young professional couple with their child who moved in mid-2024. They both work in tech and often work from home.",
    occupants: 3,
  },
  {
    id: "res004",
    position: [10.249997, 123.787336],
    name: "Garcia Residence",
    description:
      "A retired couple who moved in 2021. They spend most of their time tending to their award-winning flower garden.",
    occupants: 2,
  },
  {
    id: "res005",
    position: [10.24977, 123.787621],
    name: "Thompson Residence",
    description:
      "A well-established family of 6 that has lived here since 2019. Mr. Thompson is a local business owner.",
    occupants: 6,
  },
  {
    id: "res006",
    position: [10.249263, 123.787749],
    name: "Patel Residence",
    description: "Occupants: Dr. Raj & Priya Patel, Arjun (12), Anika (9)",
    occupants: 4,
  },
  {
    id: "res007",
    position: [10.249516, 123.787685],
    name: "Rodriguez Residence",
    description: "Occupants: Miguel & Isabella Rodriguez, Sofia (7)",
    occupants: 3,
  },
  {
    id: "res008",
    position: [10.250023, 123.787551],
    name: "Kim Residence",
    description: "Occupants: Jin & Min-ji Kim, Joon (15), Soo (12), Hana (8)",
    occupants: 5,
  },
  {
    id: "res009",
    position: [10.249997, 123.788329],
    name: "Taylor Residence",
    description: "Unoccupied: Under Renovation - New owners arriving next month",
    occupants: 0,
  },
  {
    id: "res010",
    position: [10.250048, 123.788477],
    name: "Nguyen Residence",
    description: "Occupants: Minh & Linh Nguyen",
    occupants: 2,
  },
  {
    id: "res011",
    position: [10.250086, 123.788618],
    name: "Wilson Residence",
    description: "Occupants: Thomas & Rebecca Wilson, Olivia (10)",
    occupants: 3,
  },
  {
    id: "res012",
    position: [10.250138, 123.788756],
    name: "Martinez Residence",
    description: "Under Construction: Completion expected in September 2025",
    occupants: 0,
  },
  {
    id: "res013",
    position: [10.250176, 123.788881],
    name: "Anderson Residence",
    description: "Occupants: Richard & Elizabeth Anderson, William (17), Charlotte (15), Benjamin (12), Grace (9)",
    occupants: 6,
  },
  {
    id: "res014",
    position: [10.249807, 123.788447],
    name: "Singh Residence",
    description: "Occupants: Arjun & Divya Singh, Rohan (14), Maya (11)",
    occupants: 4,
  },
  {
    id: "res015",
    position: [10.249701, 123.788549],
    name: "Brown Residence",
    description: "Upcoming Renovation: Scheduled to begin in July 2025",
    occupants: 3,
  },
  {
    id: "res016",
    position: [10.24959, 123.78864],
    name: "Lee Residence",
    description: "Occupants: David & Jennifer Lee",
    occupants: 2,
  },
  {
    id: "res017",
    position: [10.249458, 123.788747],
    name: "Davis Residence",
    description: "Unoccupied: Property for sale",
    occupants: 0,
  },
  {
    id: "res018",
    position: [10.249353, 123.788854],
    name: "Gonzalez Residence",
    description: "Occupants: Antonio & Maria Gonzalez, Elena (16), Marco (13), Lucia (9)",
    occupants: 5,
  },
  {
    id: "res019",
    position: [10.249896, 123.788731],
    name: "Miller Residence",
    description: "Occupants: Dr. James & Sarah Miller, Emma (14), Noah (11), Ava (8), Liam (5)",
    occupants: 6,
  },
  {
    id: "res020",
    position: [10.249796, 123.788828],
    name: "Wong Residence",
    description: "Upcoming Construction: New home build starting August 2025",
    occupants: 0,
  },
  {
    id: "res021",
    position: [10.24969, 123.788924],
    name: "Jackson Residence",
    description:
      "A family of 5 that has lived here since 2019. They're active in local sports and have a backyard basketball court.",
    occupants: 5,
  },
  {
    id: "res022",
    position: [10.249595, 123.789021],
    name: "White Residence",
    description:
      "A family of 4 that built this home in 2021. They're known for their beautiful water features and koi pond.",
    occupants: 4,
  },
  {
    id: "res023",
    position: [10.24949, 123.789107],
    name: "Lopez Residence",
    description:
      "A family of 3 that moved in 2022. They're passionate about cooking and often share their culinary creations with neighbors.",
    occupants: 3,
  },
  {
    id: "res024",
    position: [10.249933, 123.78901],
    name: "Harris Residence",
    description:
      "A wealthy family of 6 that renovated this historic property in 2020. They've maintained its original charm while adding modern amenities.",
    occupants: 6,
  },
  {
    id: "res025",
    position: [10.249844, 123.789117],
    name: "Clark Residence",
    description:
      "A family of 4 that moved in 2021. They're known for their beautiful holiday decorations that attract visitors from other neighborhoods.",
    occupants: 4,
  },
  {
    id: "res026",
    position: [10.249738, 123.789209],
    name: "Lewis Residence",
    description:
      "A family of 3 that relocated here in 2022. They've created a nature sanctuary in their backyard that attracts local wildlife.",
    occupants: 3,
  },
  {
    id: "res027",
    position: [10.248471, 123.789262],
    name: "Walker Residence",
    description:
      "A family of 4 that built this modern home in 2021. They're known for their minimalist design and clean aesthetic.",
    occupants: 4,
  },
  {
    id: "res028",
    position: [10.248783, 123.789257],
    name: "Hall Residence",
    description:
      "A wealthy family of 7 that moved in 2020. Mr. Hall is a successful entrepreneur who works from his custom home office.",
    occupants: 7,
  },
  {
    id: "res029",
    position: [10.249036, 123.789268],
    name: "Young Residence",
    description:
      "A family of 5 that relocated here in 2021. They're known for their beautiful rose garden that blooms year-round.",
    occupants: 5,
  },
  {
    id: "res030",
    position: [10.2493, 123.789343],
    name: "Allen Residence",
    description:
      "A large family of 6 that built this estate in 2019. They host an annual charity event in their spacious backyard.",
    occupants: 6,
  },
  {
    id: "res031",
    position: [10.249537, 123.789439],
    name: "Scott Residence",
    description:
      "A family of 4 that moved in 2022. Their home features a beautiful creek-side patio where they often entertain guests.",
    occupants: 4,
  },
  {
    id: "res032",
    position: [10.248592, 123.788881],
    name: "Green Residence",
    description:
      "A family of 3 that relocated here in 2021. They've incorporated many Asian-inspired elements in their home design.",
    occupants: 3,
  },
  {
    id: "res033",
    position: [10.248577, 123.789015],
    name: "Adams Residence",
    description:
      "A young professional couple who moved in 2023. They both work in tech and have transformed their apartment into a smart home.",
    occupants: 2,
  },
  {
    id: "res034",
    position: [10.248408, 123.788865],
    name: "Baker Residence",
    description:
      "A family of 5 that converted this historic building in 2020. They've preserved many original features while adding modern comforts.",
    occupants: 5,
  },
  {
    id: "res035",
    position: [10.248418, 123.789021],
    name: "Nelson Residence",
    description:
      "A family of 4 that moved in 2021. They're avid gardeners who have won several local landscaping awards.",
    occupants: 4,
  },
  {
    id: "res036",
    position: [10.248487, 123.78953],
    name: "Carter Residence",
    description:
      "A family of 3 that built this charming home in 2022. Mrs. Carter is an interior designer who often showcases her home in magazines.",
    occupants: 3,
  },
  {
    id: "res037",
    position: [10.248809, 123.789514],
    name: "Mitchell Residence",
    description:
      "A family of 4 that relocated here in 2021. They've created a tropical oasis with plants from their travels around the world.",
    occupants: 4,
  },
  {
    id: "res038",
    position: [10.249073, 123.789563],
    name: "Perez Residence",
    description:
      "A family of 5 that moved in 2020. Their secluded property features beautiful walking paths and a meditation garden.",
    occupants: 5,
  },
  {
    id: "res039",
    position: [10.249258, 123.789632],
    name: "Roberts Residence",
    description:
      "A family of 4 that built this modern farmhouse in 2022. They grow much of their own produce in their extensive vegetable garden.",
    occupants: 4,
  },
  {
    id: "res040",
    position: [10.249437, 123.789691],
    name: "Turner Residence",
    description:
      "A family of 3 that moved in 2021. Their property is known for its extensive gardens featuring plants from around the world.",
    occupants: 3,
  },
  {
    id: "res041",
    position: [10.248207, 123.788887],
    name: "Phillips Residence",
    description:
      "A family of 4 that relocated here in 2022. They maintain a traditional home with many heirloom furnishings.",
    occupants: 4,
  },
  {
    id: "res042",
    position: [10.248218, 123.789053],
    name: "Campbell Residence",
    description:
      "A family of 5 that built this lodge-style home in 2020. They're outdoor enthusiasts who lead the local hiking club.",
    occupants: 5,
  },
  {
    id: "res043",
    position: [10.248228, 123.789214],
    name: "Parker Residence",
    description:
      "A wealthy family of 6 that renovated this manor in 2021. They host an annual garden tour that raises funds for local charities.",
    occupants: 6,
  },
  {
    id: "res044",
    position: [10.248223, 123.789391],
    name: "Evans Residence",
    description:
      "A family of 4 that moved in 2022. They've created a Mediterranean-inspired retreat with an olive grove and herb garden.",
    occupants: 4,
  },
  {
    id: "res045",
    position: [10.248228, 123.789541],
    name: "Edwards Residence",
    description:
      "A family of 3 that built this modern home in 2021. The pavilion-style design maximizes indoor-outdoor living.",
    occupants: 3,
  },
  {
    id: "res046",
    position: [10.248234, 123.789697],
    name: "Collins Residence",
    description:
      "A family of 5 that relocated here in 2020. Their courtyard home features a central fountain and extensive seating areas.",
    occupants: 5,
  },
  {
    id: "res047",
    position: [10.24949, 123.78802],
    name: "Basketball Court",
    description:
      "A community basketball court that serves as a gathering place for residents. It's well-maintained and often busy.",
    occupants: 4,
  },
  {
    id: "res048",
    position: [10.248904, 123.788951],
    name: "Basketball Court",
    description:
      "A community basketball court that serves as a gathering place for residents. It's well-maintained and often busy.",
    occupants: 5,
  },
  {
    id: "res049",
    position: [10.248492, 123.790416],
    name: "Clinic",
    description:
      "A small community clinic that provides basic healthcare services. It's staffed by a friendly team of local doctors and nurses.",
    occupants: 2,
  },
  {
    id: "res050",
    position: [10.248218, 123.790367],
    name: "Summit Hall",
    description:
      "A community center that hosts events and activities for residents. It's a hub for social gatherings and local clubs.",
    occupants: 3,
  },
  {
    id: "res051",
    position: [10.250218, 123.788093],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res052",
    position: [10.250271, 123.788307],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res053",
    position: [10.250329, 123.788506],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res054",
    position: [10.250424, 123.788699],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res055",
    position: [10.250408, 123.789305],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res056",
    position: [10.250118, 123.789364],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res057",
    position: [10.247917, 123.789198],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
  {
    id: "res058",
    position: [10.250155, 123.787894],
    name: "Parking Lot",
    description: "A large parking area for residents and visitors. It's well-lit and monitored for security.",
    occupants: 3,
  },
]

// Update the customPins array to include more realistic residence data
// Find the Kim Residence entry (id: "res008") and update it
const kimResidenceIndex = customPins.findIndex((pin) => pin.id === "res008")
if (kimResidenceIndex !== -1) {
  customPins[kimResidenceIndex] = {
    id: "res008",
    position: [10.250023, 123.787551],
    name: "Kim Residence",
    description: "4 occupants\nJin (44) (father) & Mary (37) (mother), Curry (24), Kath (55)",
    occupants: 4,
  }
}

// Add more detailed construction/renovation statuses to various residences
// Update res009 (Taylor Residence) with more detailed renovation info
const taylorResidenceIndex = customPins.findIndex((pin) => pin.id === "res009")
if (taylorResidenceIndex !== -1) {
  customPins[taylorResidenceIndex] = {
    id: "res009",
    position: [10.249997, 123.788329],
    name: "Taylor Residence",
    description:
      "Unoccupied: Under Renovation - Bathroom and kitchen remodeling in progress. Estimated completion: July 15, 2025",
    occupants: 0,
  }
}

// Update res012 (Martinez Residence) with more detailed construction info
const martinezResidenceIndex = customPins.findIndex((pin) => pin.id === "res012")
if (martinezResidenceIndex !== -1) {
  customPins[martinezResidenceIndex] = {
    id: "res012",
    position: [10.250138, 123.788756],
    name: "Martinez Residence",
    description:
      "Under Construction: Two-story modern home with 4 bedrooms. Foundation completed. Completion expected by September 30, 2025",
    occupants: 0,
  }
}

// Update res015 (Brown Residence) with more detailed upcoming renovation info
const brownResidenceIndex = customPins.findIndex((pin) => pin.id === "res015")
if (brownResidenceIndex !== -1) {
  customPins[brownResidenceIndex] = {
    id: "res015",
    position: [10.249701, 123.788549],
    name: "Brown Residence",
    description:
      "Upcoming Renovation: Major interior redesign and roof replacement. Scheduled to begin on July 5, 2025. Estimated completion: October 15, 2025",
    occupants: 3,
  }
}

// Update res020 (Wong Residence) with more detailed upcoming construction info
const wongResidenceIndex = customPins.findIndex((pin) => pin.id === "res020")
if (wongResidenceIndex !== -1) {
  customPins[wongResidenceIndex] = {
    id: "res020",
    position: [10.249796, 123.788828],
    name: "Wong Residence",
    description:
      "Upcoming Construction: New 3-bedroom contemporary home with solar panels. Construction starting August 12, 2025. Estimated completion: March 2026",
    occupants: 0,
  }
}

// Remove the newly added pins (res060-res063) and update the existing pins
// Find the code that adds new pins (starting with customPins.push) and remove those lines

// Instead, update the existing pins to have member-focused descriptions
// Update the Kim Residence (already done correctly)
const kimResidenceIndex2 = customPins.findIndex((pin) => pin.id === "res008")
if (kimResidenceIndex2 !== -1) {
  customPins[kimResidenceIndex2] = {
    id: "res008",
    position: [10.250023, 123.787551],
    name: "Kim Residence",
    description: "4 occupants\nJin (44) (father) & Mary (37) (mother), Curry (24), Kath (55)",
    occupants: 4,
  }
}

// Update Johnson Residence
const johnsonResidenceIndex = customPins.findIndex((pin) => pin.id === "res001")
if (johnsonResidenceIndex !== -1) {
  customPins[johnsonResidenceIndex] = {
    id: "res001",
    position: [10.2492, 123.787546],
    name: "Johnson Residence",
    description: "4 occupants\nRobert (42) & Sarah (39), Emma (12), Noah (8)",
    occupants: 4,
  }
}

// Update Williams Residence
const williamsResidenceIndex = customPins.findIndex((pin) => pin.id === "res002")
if (williamsResidenceIndex !== -1) {
  customPins[williamsResidenceIndex] = {
    id: "res002",
    position: [10.24949, 123.787481],
    name: "Williams Residence",
    description: "5 occupants\nJames (45) & Elizabeth (43), Michael (17), Jessica (15), Daniel (10)",
    occupants: 5,
  }
}

// Update Chen Residence
const chenResidenceIndex = customPins.findIndex((pin) => pin.id === "res003")
if (chenResidenceIndex !== -1) {
  customPins[chenResidenceIndex] = {
    id: "res003",
    position: [10.249738, 123.787411],
    name: "Chen Residence",
    description: "3 occupants\nWei (36) & Li (34), Mei (5)",
    occupants: 3,
  }
}

// Update Garcia Residence
const garciaResidenceIndex = customPins.findIndex((pin) => pin.id === "res004")
if (garciaResidenceIndex !== -1) {
  customPins[garciaResidenceIndex] = {
    id: "res004",
    position: [10.249997, 123.787336],
    name: "Garcia Residence",
    description: "2 occupants\nCarlos (68) & Maria (65)",
    occupants: 2,
  }
}

// Update Thompson Residence
const thompsonResidenceIndex = customPins.findIndex((pin) => pin.id === "res005")
if (thompsonResidenceIndex !== -1) {
  customPins[thompsonResidenceIndex] = {
    id: "res005",
    position: [10.24977, 123.787621],
    name: "Thompson Residence",
    description: "6 occupants\nDavid (47) & Jennifer (45), Christopher (19), Ashley (17), Matthew (14), Olivia (12)",
    occupants: 6,
  }
}

// Update Patel Residence (already in correct format)
const patelResidenceIndex = customPins.findIndex((pin) => pin.id === "res006")
if (patelResidenceIndex !== -1) {
  customPins[patelResidenceIndex] = {
    id: "res006",
    position: [10.249263, 123.787749],
    name: "Patel Residence",
    description: "4 occupants\nDr. Raj (41) & Priya (38), Arjun (12), Anika (9)",
    occupants: 4,
  }
}

// Update Rodriguez Residence (already in correct format)
const rodriguezResidenceIndex = customPins.findIndex((pin) => pin.id === "res007")
if (rodriguezResidenceIndex !== -1) {
  customPins[rodriguezResidenceIndex] = {
    id: "res007",
    position: [10.249516, 123.787685],
    name: "Rodriguez Residence",
    description: "3 occupants\nMiguel (35) & Isabella (33), Sofia (7)",
    occupants: 3,
  }
}

// Update Taylor Residence (under renovation)
const taylorResidenceIndex2 = customPins.findIndex((pin) => pin.id === "res009")
if (taylorResidenceIndex2 !== -1) {
  customPins[taylorResidenceIndex2] = {
    id: "res009",
    position: [10.249997, 123.788329],
    name: "Taylor Residence",
    description: "Under Renovation - Bathroom and kitchen remodeling in progress. Estimated completion: July 15, 2025",
    occupants: 0,
  }
}

// Update Nguyen Residence
const nguyenResidenceIndex = customPins.findIndex((pin) => pin.id === "res010")
if (nguyenResidenceIndex !== -1) {
  customPins[nguyenResidenceIndex] = {
    id: "res010",
    position: [10.250048, 123.788477],
    name: "Nguyen Residence",
    description: "2 occupants\nMinh (40) & Linh (38)",
    occupants: 2,
  }
}

// Update Wilson Residence
const wilsonResidenceIndex = customPins.findIndex((pin) => pin.id === "res011")
if (wilsonResidenceIndex !== -1) {
  customPins[wilsonResidenceIndex] = {
    id: "res011",
    position: [10.250086, 123.788618],
    name: "Wilson Residence",
    description: "3 occupants\nThomas (37) & Rebecca (35), Olivia (10)",
    occupants: 3,
  }
}

// Update Martinez Residence (under construction)
const martinezResidenceIndex2 = customPins.findIndex((pin) => pin.id === "res012")
if (martinezResidenceIndex2 !== -1) {
  customPins[martinezResidenceIndex2] = {
    id: "res012",
    position: [10.250138, 123.788756],
    name: "Martinez Residence",
    description:
      "Under Construction: Two-story modern home with 4 bedrooms. Foundation completed. Completion expected by September 30, 2025",
    occupants: 0,
  }
}

// Update Anderson Residence
const andersonResidenceIndex = customPins.findIndex((pin) => pin.id === "res013")
if (andersonResidenceIndex !== -1) {
  customPins[andersonResidenceIndex] = {
    id: "res013",
    position: [10.250176, 123.788881],
    name: "Anderson Residence",
    description: "6 occupants\nRichard (46) & Elizabeth (44), William (17), Charlotte (15), Benjamin (12), Grace (9)",
    occupants: 6,
  }
}

// Update Singh Residence
const singhResidenceIndex = customPins.findIndex((pin) => pin.id === "res014")
if (singhResidenceIndex !== -1) {
  customPins[singhResidenceIndex] = {
    id: "res014",
    position: [10.249807, 123.788447],
    name: "Singh Residence",
    description: "4 occupants\nArjun (42) & Divya (40), Rohan (14), Maya (11)",
    occupants: 4,
  }
}

// Update Brown Residence (upcoming renovation)
const brownResidenceIndex2 = customPins.findIndex((pin) => pin.id === "res015")
if (brownResidenceIndex2 !== -1) {
  customPins[brownResidenceIndex2] = {
    id: "res015",
    position: [10.249701, 123.788549],
    name: "Brown Residence",
    description:
      "Upcoming Renovation: Major interior redesign and roof replacement. Scheduled to begin on July 5, 2025. Estimated completion: October 15, 2025",
    occupants: 3,
  }
}

// Update Lee Residence
const leeResidenceIndex = customPins.findIndex((pin) => pin.id === "res016")
if (leeResidenceIndex !== -1) {
  customPins[leeResidenceIndex] = {
    id: "res016",
    position: [10.24959, 123.78864],
    name: "Lee Residence",
    description: "2 occupants\nDavid (39) & Jennifer (37)",
    occupants: 2,
  }
}

// Update Davis Residence (unoccupied)
const davisResidenceIndex = customPins.findIndex((pin) => pin.id === "res017")
if (davisResidenceIndex !== -1) {
  customPins[davisResidenceIndex] = {
    id: "res017",
    position: [10.249458, 123.788747],
    name: "Davis Residence",
    description: "Unoccupied: Property for sale",
    occupants: 0,
  }
}

// Update Gonzalez Residence
const gonzalezResidenceIndex = customPins.findIndex((pin) => pin.id === "res018")
if (gonzalezResidenceIndex !== -1) {
  customPins[gonzalezResidenceIndex] = {
    id: "res018",
    position: [10.249353, 123.788854],
    name: "Gonzalez Residence",
    description: "5 occupants\nAntonio (45) & Maria (43), Elena (16), Marco (13), Lucia (9)",
    occupants: 5,
  }
}

// Update Miller Residence
const millerResidenceIndex = customPins.findIndex((pin) => pin.id === "res019")
if (millerResidenceIndex !== -1) {
  customPins[millerResidenceIndex] = {
    id: "res019",
    position: [10.249896, 123.788731],
    name: "Miller Residence",
    description: "6 occupants\nDr. James (44) & Sarah (42), Emma (14), Noah (11), Ava (8), Liam (5)",
    occupants: 6,
  }
}

// Update Wong Residence (upcoming construction)
const wongResidenceIndex2 = customPins.findIndex((pin) => pin.id === "res020")
if (wongResidenceIndex2 !== -1) {
  customPins[wongResidenceIndex2] = {
    id: "res020",
    position: [10.249796, 123.788828],
    name: "Wong Residence",
    description:
      "Upcoming Construction: New 3-bedroom contemporary home with solar panels. Construction starting August 12, 2025. Estimated completion: March 2026",
    occupants: 0,
  }
}

// Update Jackson Residence
const jacksonResidenceIndex = customPins.findIndex((pin) => pin.id === "res021")
if (jacksonResidenceIndex !== -1) {
  customPins[jacksonResidenceIndex] = {
    id: "res021",
    position: [10.24969, 123.788924],
    name: "Jackson Residence",
    description: "5 occupants\nMichael (43) & Stephanie (41), Tyler (15), Madison (13), Ethan (10)",
    occupants: 5,
  }
}

// Update White Residence
const whiteResidenceIndex = customPins.findIndex((pin) => pin.id === "res022")
if (whiteResidenceIndex !== -1) {
  customPins[whiteResidenceIndex] = {
    id: "res022",
    position: [10.249595, 123.789021],
    name: "White Residence",
    description: "4 occupants\nRobert (46) & Susan (44), Brian (16), Emily (14)",
    occupants: 4,
  }
}

// Update Lopez Residence
const lopezResidenceIndex = customPins.findIndex((pin) => pin.id === "res023")
if (lopezResidenceIndex !== -1) {
  customPins[lopezResidenceIndex] = {
    id: "res023",
    position: [10.24949, 123.789107],
    name: "Lopez Residence",
    description: "3 occupants\nJose (38) & Carmen (36), Diego (8)",
    occupants: 3,
  }
}

// Update Harris Residence
const harrisResidenceIndex = customPins.findIndex((pin) => pin.id === "res024")
if (harrisResidenceIndex !== -1) {
  customPins[harrisResidenceIndex] = {
    id: "res024",
    position: [10.249933, 123.78901],
    name: "Harris Residence",
    description: "6 occupants\nWilliam (52) & Victoria (49), Alexander (22), Sophia (20), Jonathan (18), Isabelle (16)",
    occupants: 6,
  }
}

// Update Clark Residence
const clarkResidenceIndex = customPins.findIndex((pin) => pin.id === "res025")
if (clarkResidenceIndex !== -1) {
  customPins[clarkResidenceIndex] = {
    id: "res025",
    position: [10.249844, 123.789117],
    name: "Clark Residence",
    description: "4 occupants\nDaniel (40) & Laura (38), Nathan (12), Abigail (9)",
    occupants: 4,
  }
}

// Update Lewis Residence
const lewisResidenceIndex = customPins.findIndex((pin) => pin.id === "res026")
if (lewisResidenceIndex !== -1) {
  customPins[lewisResidenceIndex] = {
    id: "res026",
    position: [10.249738, 123.789209],
    name: "Lewis Residence",
    description: "3 occupants\nKevin (37) & Rachel (35), Zachary (7)",
    occupants: 3,
  }
}

// Update Walker Residence
const walkerResidenceIndex = customPins.findIndex((pin) => pin.id === "res027")
if (walkerResidenceIndex !== -1) {
  customPins[walkerResidenceIndex] = {
    id: "res027",
    position: [10.248471, 123.789262],
    name: "Walker Residence",
    description: "4 occupants\nChristopher (41) & Amanda (39), Joshua (13), Megan (11)",
    occupants: 4,
  }
}

// Update Hall Residence
const hallResidenceIndex = customPins.findIndex((pin) => pin.id === "res028")
if (hallResidenceIndex !== -1) {
  customPins[hallResidenceIndex] = {
    id: "res028",
    position: [10.248783, 123.789257],
    name: "Hall Residence",
    description:
      "7 occupants\nJoseph (48) & Catherine (46), Andrew (21), Elizabeth (19), Benjamin (17), Samantha (15), Nicholas (12)",
    occupants: 7,
  }
}

// Update Young Residence
const youngResidenceIndex = customPins.findIndex((pin) => pin.id === "res029")
if (youngResidenceIndex !== -1) {
  customPins[youngResidenceIndex] = {
    id: "res029",
    position: [10.249036, 123.789268],
    name: "Young Residence",
    description: "5 occupants\nRichard (44) & Patricia (42), Brandon (16), Melissa (14), Justin (11)",
    occupants: 5,
  }
}

// Update Allen Residence
const allenResidenceIndex = customPins.findIndex((pin) => pin.id === "res030")
if (allenResidenceIndex !== -1) {
  customPins[allenResidenceIndex] = {
    id: "res030",
    position: [10.2493, 123.789343],
    name: "Allen Residence",
    description:
      "6 occupants\nThomas (50) & Margaret (48), Christopher (23), Jennifer (21), Michael (19), Stephanie (17)",
    occupants: 6,
  }
}

// Update Scott Residence
const scottResidenceIndex = customPins.findIndex((pin) => pin.id === "res031")
if (scottResidenceIndex !== -1) {
  customPins[scottResidenceIndex] = {
    id: "res031",
    position: [10.249537, 123.789439],
    name: "Scott Residence",
    description: "4 occupants\nMatthew (42) & Jessica (40), Ryan (14), Lauren (11)",
    occupants: 4,
  }
}

// Update Green Residence
const greenResidenceIndex = customPins.findIndex((pin) => pin.id === "res032")
if (greenResidenceIndex !== -1) {
  customPins[greenResidenceIndex] = {
    id: "res032",
    position: [10.248592, 123.788881],
    name: "Green Residence",
    description: "3 occupants\nDaniel (39) & Michelle (37), Jacob (10)",
    occupants: 3,
  }
}

// Update Adams Residence
const adamsResidenceIndex = customPins.findIndex((pin) => pin.id === "res033")
if (adamsResidenceIndex !== -1) {
  customPins[adamsResidenceIndex] = {
    id: "res033",
    position: [10.248577, 123.789015],
    name: "Adams Residence",
    description: "2 occupants\nJason (34) & Nicole (32)",
    occupants: 2,
  }
}

// Update Baker Residence
const bakerResidenceIndex = customPins.findIndex((pin) => pin.id === "res034")
if (bakerResidenceIndex !== -1) {
  customPins[bakerResidenceIndex] = {
    id: "res034",
    position: [10.248408, 123.788865],
    name: "Baker Residence",
    description: "5 occupants\nJeffrey (45) & Kimberly (43), Brandon (17), Heather (15), Tyler (12)",
    occupants: 5,
  }
}

// Update Nelson Residence
const nelsonResidenceIndex = customPins.findIndex((pin) => pin.id === "res035")
if (nelsonResidenceIndex !== -1) {
  customPins[nelsonResidenceIndex] = {
    id: "res035",
    position: [10.248418, 123.789021],
    name: "Nelson Residence",
    description: "4 occupants\nSteven (43) & Rebecca (41), Zachary (15), Olivia (12)",
    occupants: 4,
  }
}

// Update Carter Residence
const carterResidenceIndex = customPins.findIndex((pin) => pin.id === "res036")
if (carterResidenceIndex !== -1) {
  customPins[carterResidenceIndex] = {
    id: "res036",
    position: [10.248487, 123.78953],
    name: "Carter Residence",
    description: "3 occupants\nBrian (40) & Jennifer (38), Sophia (9)",
    occupants: 3,
  }
}

// Update Mitchell Residence
const mitchellResidenceIndex = customPins.findIndex((pin) => pin.id === "res037")
if (mitchellResidenceIndex !== -1) {
  customPins[mitchellResidenceIndex] = {
    id: "res037",
    position: [10.248809, 123.789514],
    name: "Mitchell Residence",
    description: "4 occupants\nKevin (41) & Lisa (39), Nathan (13), Emily (10)",
    occupants: 4,
  }
}

// Update Perez Residence
const perezResidenceIndex = customPins.findIndex((pin) => pin.id === "res038")
if (perezResidenceIndex !== -1) {
  customPins[perezResidenceIndex] = {
    id: "res038",
    position: [10.249073, 123.789563],
    name: "Perez Residence",
    description: "5 occupants\nRobert (46) & Maria (44), Carlos (18), Isabella (16), Sofia (13)",
    occupants: 5,
  }
}

// Update Roberts Residence
const robertsResidenceIndex = customPins.findIndex((pin) => pin.id === "res039")
if (robertsResidenceIndex !== -1) {
  customPins[robertsResidenceIndex] = {
    id: "res039",
    position: [10.249258, 123.789632],
    name: "Roberts Residence",
    description: "4 occupants\nWilliam (42) & Sarah (40), James (14), Emma (11)",
    occupants: 4,
  }
}

// Update Turner Residence
const turnerResidenceIndex = customPins.findIndex((pin) => pin.id === "res040")
if (turnerResidenceIndex !== -1) {
  customPins[turnerResidenceIndex] = {
    id: "res040",
    position: [10.249437, 123.789691],
    name: "Turner Residence",
    description: "3 occupants\nDavid (38) & Elizabeth (36), Olivia (8)",
    occupants: 3,
  }
}

// Update Phillips Residence
const phillipsResidenceIndex = customPins.findIndex((pin) => pin.id === "res041")
if (phillipsResidenceIndex !== -1) {
  customPins[phillipsResidenceIndex] = {
    id: "res041",
    position: [10.248207, 123.788887],
    name: "Phillips Residence",
    description: "4 occupants\nMichael (43) & Jennifer (41), Matthew (15), Ashley (12)",
    occupants: 4,
  }
}

// Update Campbell Residence
const campbellResidenceIndex = customPins.findIndex((pin) => pin.id === "res042")
if (campbellResidenceIndex !== -1) {
  customPins[campbellResidenceIndex] = {
    id: "res042",
    position: [10.248218, 123.789053],
    name: "Campbell Residence",
    description: "5 occupants\nRobert (47) & Susan (45), Christopher (19), Jessica (17), Andrew (14)",
    occupants: 5,
  }
}

// Update Parker Residence
const parkerResidenceIndex = customPins.findIndex((pin) => pin.id === "res043")
if (parkerResidenceIndex !== -1) {
  customPins[parkerResidenceIndex] = {
    id: "res043",
    position: [10.248228, 123.789214],
    name: "Parker Residence",
    description: "6 occupants\nJames (51) & Patricia (49), Thomas (22), Michelle (20), Daniel (18), Stephanie (16)",
    occupants: 6,
  }
}

// Update Evans Residence
const evansResidenceIndex = customPins.findIndex((pin) => pin.id === "res044")
if (evansResidenceIndex !== -1) {
  customPins[evansResidenceIndex] = {
    id: "res044",
    position: [10.248223, 123.789391],
    name: "Evans Residence",
    description: "4 occupants\nJohn (44) & Laura (42), Ryan (16), Megan (13)",
    occupants: 4,
  }
}

// Update Edwards Residence
const edwardsResidenceIndex = customPins.findIndex((pin) => pin.id === "res045")
if (edwardsResidenceIndex !== -1) {
  customPins[edwardsResidenceIndex] = {
    id: "res045",
    position: [10.248228, 123.789541],
    name: "Edwards Residence",
    description: "3 occupants\nSteven (39) & Karen (37), Joshua (10)",
    occupants: 3,
  }
}

// Update Collins Residence
const collinsResidenceIndex = customPins.findIndex((pin) => pin.id === "res046")
if (collinsResidenceIndex !== -1) {
  customPins[collinsResidenceIndex] = {
    id: "res046",
    position: [10.248234, 123.789697],
    name: "Collins Residence",
    description: "5 occupants\nCharles (46) & Margaret (44), Andrew (18), Elizabeth (16), Matthew (13)",
    occupants: 5,
  }
}

// Add a few renovation/construction statuses to existing residences
// Update a residence to be under renovation
const randomRenovationIndex = customPins.findIndex((pin) => pin.id === "res025")
if (randomRenovationIndex !== -1) {
  customPins[randomRenovationIndex] = {
    ...customPins[randomRenovationIndex],
    description: "Under Renovation: Kitchen and master bathroom remodeling. Estimated completion: August 25, 2025",
    occupants: 0,
  }
}

// Update a residence to be under construction
const randomConstructionIndex = customPins.findIndex((pin) => pin.id === "res032")
if (randomConstructionIndex !== -1) {
  customPins[randomConstructionIndex] = {
    ...customPins[randomConstructionIndex],
    description:
      "Under Construction: New two-story family home. Framing in progress. Estimated completion: December 10, 2025",
    occupants: 0,
  }
}

// Update a residence to have upcoming renovation
const randomUpcomingRenovationIndex = customPins.findIndex((pin) => pin.id === "res037")
if (randomUpcomingRenovationIndex !== -1) {
  customPins[randomUpcomingRenovationIndex] = {
    ...customPins[randomUpcomingRenovationIndex],
    description:
      "Upcoming Renovation: Adding a second floor and expanding the kitchen. Starting June 15, 2025. Estimated completion: October 30, 2025",
    occupants: 4,
  }
}

// Update a residence to have upcoming construction
const randomUpcomingConstructionIndex = customPins.findIndex((pin) => pin.id === "res042")
if (randomUpcomingConstructionIndex !== -1) {
  customPins[randomUpcomingConstructionIndex] = {
    ...customPins[randomUpcomingConstructionIndex],
    description:
      "Upcoming Construction: New modern family home with 5 bedrooms. Starting July 20, 2025. Estimated completion: February 28, 2026",
    occupants: 0,
  }
}

// Update a residence to have renovation paused
const randomRenovationPausedIndex = customPins.findIndex((pin) => pin.id === "res028")
if (randomRenovationPausedIndex !== -1) {
  customPins[randomRenovationPausedIndex] = {
    ...customPins[randomRenovationPausedIndex],
    description:
      "Renovation Paused: Interior remodeling paused due to permit issues. Expected to resume August 5, 2025",
    occupants: 0,
  }
}

// Update a residence to have construction paused
const randomConstructionPausedIndex = customPins.findIndex((pin) => pin.id === "res034")
if (randomConstructionPausedIndex !== -1) {
  customPins[randomConstructionPausedIndex] = {
    ...customPins[randomConstructionPausedIndex],
    description:
      "Construction Paused: New home construction paused for material delivery. Expected to resume July 1, 2025",
    occupants: 0,
  }
}

// Update a residence to be in final inspection
const randomFinalInspectionIndex = customPins.findIndex((pin) => pin.id === "res039")
if (randomFinalInspectionIndex !== -1) {
  customPins[randomFinalInspectionIndex] = {
    ...customPins[randomFinalInspectionIndex],
    description: "Final Inspection: Construction completed, awaiting final inspection on June 10, 2025",
    occupants: 0,
  }
}

// Update a residence to have permit pending
const randomPermitPendingIndex = customPins.findIndex((pin) => pin.id === "res044")
if (randomPermitPendingIndex !== -1) {
  customPins[randomPermitPendingIndex] = {
    ...customPins[randomPermitPendingIndex],
    description:
      "Permit Pending: Renovation plans submitted, awaiting permit approval. Expected start date: July 25, 2025",
    occupants: 4,
  }
}

// Add a default pin colors array
export const defaultPinColors = [
  "#3B82F6", // blue
  "#EF4444", // red
  "#10B981", // green
  "#F59E0B", // amber
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#F97316", // orange
]

export interface PolygonData {
  id: string
  positions: [number, number][]
  name: string
  type: string
  color: string
  properties: PinProperties
}

// Update the polygonData array to include more detailed properties and colors
export const polygonData: PolygonData[] = [
  {
    id: "zone1",
    positions: [
      [10.250039, 123.787369],
      [10.250028, 123.787283],
      [10.249163, 123.787508],
      [10.249178, 123.787605],
    ],
    name: "Zone A1",
    type: "Residential Zone",
    color: "#8B5CF6", // purple
    properties: {
      id: "Zone1",
      name: "Zone A1",
      blockNumber: "A1",
      numberOfHouseholds: 25,
      totalResidents: 95,
      yearEstablished: 2010,
      type: "Residential Zone",
      houses: Array.from({ length: 25 }, (_, i) => {
        const houseId = `A1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone2",
    positions: [
      [10.250034, 123.787497],
      [10.250055, 123.787578],
      [10.249226, 123.787819],
      [10.249194, 123.787712],
    ],
    name: "Zone A2",
    type: "Residential Zone",
    color: "#8B5CF6", // purple
    properties: {
      id: "Zone2",
      name: "Zone A2",
      blockNumber: "A2",
      numberOfHouseholds: 22,
      totalResidents: 88,
      yearEstablished: 2010,
      type: "Residential Zone",
      houses: Array.from({ length: 22 }, (_, i) => {
        const houseId = `A2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },

  // Upper middle zones
  {
    id: "zone3",
    positions: [
      [10.249939, 123.788275],
      [10.250139, 123.788962],
      [10.250261, 123.78894],
      [10.250049, 123.788227],
    ],
    name: "Zone B1",
    type: "Residential Zone",
    color: "#EC4899", // pink
    properties: {
      id: "Zone3",
      name: "Zone B1",
      blockNumber: "B1",
      numberOfHouseholds: 18,
      totalResidents: 72,
      yearEstablished: 2011,
      type: "Residential Zone",
      houses: Array.from({ length: 18 }, (_, i) => {
        const houseId = `B1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone4",
    positions: [
      [10.249822, 123.788329],
      [10.249875, 123.788468],
      [10.249347, 123.788972],
      [10.249236, 123.788881],
    ],
    name: "Zone B2",
    type: "Residential Zone",
    color: "#EC4899", // pink
    properties: {
      id: "Zone4",
      name: "Zone B2",
      blockNumber: "B2",
      numberOfHouseholds: 20,
      totalResidents: 80,
      yearEstablished: 2011,
      type: "Residential Zone",
      houses: Array.from({ length: 20 }, (_, i) => {
        const houseId = `B2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone5",
    positions: [
      [10.249917, 123.788624],
      [10.249965, 123.788758],
      [10.249522, 123.78916],
      [10.249379, 123.789123],
    ],
    name: "Zone B3",
    type: "Residential Zone",
    color: "#EC4899", // pink
    properties: {
      id: "Zone5",
      name: "Zone B3",
      blockNumber: "B3",
      numberOfHouseholds: 15,
      totalResidents: 60,
      yearEstablished: 2011,
      type: "Residential Zone",
      houses: Array.from({ length: 15 }, (_, i) => {
        const houseId = `B3-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },

  // Middle zones
  {
    id: "zone6",
    positions: [
      [10.249991, 123.788913],
      [10.249999, 123.789026],
      [10.249754, 123.789284],
      [10.249622, 123.789219],
    ],
    name: "Zone C1",
    type: "Residential Zone",
    color: "#10B981", // green
    properties: {
      id: "Zone6",
      name: "Zone C1",
      blockNumber: "C1",
      numberOfHouseholds: 16,
      totalResidents: 64,
      yearEstablished: 2012,
      type: "Residential Zone",
      houses: Array.from({ length: 16 }, (_, i) => {
        const houseId = `C1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone7",
    positions: [
      [10.248434, 123.789332],
      [10.248434, 123.789209],
      [10.248867, 123.789187],
      [10.249236, 123.78923],
      [10.249664, 123.789402],
      [10.249595, 123.789514],
      [10.249094, 123.789321],
    ],
    name: "Zone C2",
    type: "Residential Zone",
    color: "#10B981", // green
    properties: {
      id: "Zone7",
      name: "Zone C2",
      blockNumber: "C2",
      numberOfHouseholds: 17,
      totalResidents: 68,
      yearEstablished: 2012,
      type: "Residential Zone",
      houses: Array.from({ length: 17 }, (_, i) => {
        const houseId = `C2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },

  // Lower zones (Saint Mary area)
  {
    id: "zone8",
    positions: [
      [10.249532, 123.789659],
      [10.249506, 123.78975],
      [10.248983, 123.789584],
      [10.248455, 123.789605],
      [10.248424, 123.789466],
      [10.248951, 123.78945],
    ],
    name: "Zone D1",
    type: "Residential Zone",
    color: "#F59E0B", // amber
    properties: {
      id: "Zone8",
      name: "Zone D1",
      blockNumber: "D1",
      numberOfHouseholds: 14,
      totalResidents: 56,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: Array.from({ length: 14 }, (_, i) => {
        const houseId = `D1-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone9",
    positions: [
      [10.248619, 123.788833],
      [10.248614, 123.789053],
      [10.248677, 123.789048],
      [10.248687, 123.788828],
    ],
    name: "Zone D2",
    type: "Residential Zone",
    color: "#F59E0B", // amber
    properties: {
      id: "Zone9",
      name: "Zone D2",
      blockNumber: "D2",
      numberOfHouseholds: 12,
      totalResidents: 48,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: Array.from({ length: 12 }, (_, i) => {
        const houseId = `D2-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone10",
    positions: [
      [10.248397, 123.789069],
      [10.248471, 123.789058],
      [10.248487, 123.788822],
      [10.248397, 123.788822],
    ],
    name: "Zone D3",
    type: "Residential Zone",
    color: "#F59E0B",
    properties: {
      id: "Zone10",
      name: "Zone D3",
      blockNumber: "D3",
      numberOfHouseholds: 10,
      totalResidents: 40,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: Array.from({ length: 10 }, (_, i) => {
        const houseId = `D3-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone11",
    positions: [
      [10.248197, 123.789783],
      [10.24817, 123.788822],
      [10.24827, 123.788801],
      [10.248302, 123.789783],
    ],
    name: "Zone D4",
    type: "Residential Zone",
    color: "#F59E0B",
    properties: {
      id: "Zone11",
      name: "Zone D4",
      blockNumber: "D4",
      numberOfHouseholds: 11,
      totalResidents: 44,
      yearEstablished: 2013,
      type: "Residential Zone",
      houses: Array.from({ length: 11 }, (_, i) => {
        const houseId = `D4-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone12",
    positions: [
      [10.248603, 123.79099],
      [10.24835, 123.789917],
      [10.248434, 123.789933],
      [10.248719, 123.790957],
    ],
    name: "Zone D5",
    type: "Commercial Zone",
    color: "#EF4444", // red
    properties: {
      id: "Zone12",
      name: "Zone D5",
      blockNumber: "D5",
      numberOfHouseholds: 13,
      totalResidents: 52,
      yearEstablished: 2013,
      type: "Commercial Zone",
      houses: Array.from({ length: 13 }, (_, i) => {
        const houseId = `D5-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
                "Broken window replacement needed",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
  {
    id: "zone13",
    positions: [
      [10.248075, 123.789943],
      [10.248276, 123.790829],
      [10.248424, 123.790823],
      [10.248197, 123.789943],
    ],
    name: "Zone D6",
    type: "Community Zone",
    color: "#3B82F6", // blue
    properties: {
      id: "Zone13",
      name: "Zone D6",
      blockNumber: "D6",
      numberOfHouseholds: 9,
      totalResidents: 36,
      yearEstablished: 2013,
      type: "Community Zone",
      houses: Array.from({ length: 9 }, (_, i) => {
        const houseId = `D6-${i + 1}`
        const statusTypes: StatusType[] = [
          "Occupied",
          "Unoccupied",
          "Under Renovation",
          "Upcoming Renovation",
          "Under Construction",
          "Upcoming Construction",
        ]
        const statusType =
          Math.random() < 0.6
            ? "Occupied"
            : Math.random() < 0.3
              ? "Unoccupied"
              : statusTypes[Math.floor(Math.random() * (statusTypes.length - 2)) + 2]

        // Set occupants to 0 if unoccupied
        const occupants = statusType === "Unoccupied" ? 0 : Math.floor(Math.random() * 6) + 1

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const randomMonth = months[Math.floor(Math.random() * months.length)]
        const randomYear = 2022 + Math.floor(Math.random() * 3) // 2022-2024

        const incidentTypes: IncidentType[] = ["Maintenance", "Noise", "Construction", "Other"]

        // No incidents if unoccupied
        const hasIncidents = statusType !== "Unoccupied" && Math.random() < 0.4
        const numIncidents = hasIncidents ? Math.floor(Math.random() * 3) + 1 : 0

        return {
          id: houseId,
          occupants,
          status: {
            type: statusType as StatusType,
            date: `Since ${randomMonth} ${randomYear}`,
          },
          incidents: Array.from({ length: numIncidents }, () => {
            const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
            const day = Math.floor(Math.random() * 28) + 1
            const incidentMonth = months[Math.floor(Math.random() * months.length)]
            const incidentYear = 2023 + Math.floor(Math.random() * 2) // 2023-2024

            const descriptions = {
              Maintenance: [
                "Water leak in bathroom requiring plumbing repair",
                "HVAC system failure requiring technician",
                "Electrical wiring issue in kitchen",
                "Roof damage from recent storm",
              ],
              Noise: [
                "Complaint from neighbors about loud music",
                "Construction noise during quiet hours",
                "Late night party disturbance",
                "Barking dog complaint from neighbors",
                "Loud arguments reported by adjacent residents",
              ],
              Construction: [
                "Unauthorized home extension construction",
                "Permit violation for backyard structure",
                "Construction debris not properly disposed",
                "Workers starting before allowed hours",
                "Damage to common area during material delivery",
              ],
              Other: [
                "Parking dispute with neighbors",
                "Parking dispute with neighbors",
                "Unauthorized landscape modification",
                "Trash bins left out for extended period",
                "Pet waste not cleaned up in common area",
                "Unauthorized use of neighbor's utilities",
              ],
            }

            const descriptionArray = descriptions[incidentType]
            const description = descriptionArray[Math.floor(Math.random() * descriptionArray.length)]

            return {
              type: incidentType,
              description,
              date: `${incidentMonth} ${day}, ${incidentYear}`,
            }
          }),
        }
      }),
    },
  },
]

// Update several houses in the polygonData to use the new status types
// For example, in the first zone:
polygonData[0].properties.houses.forEach((house, index) => {
  if (index === 2) {
    house.status.type = "Renovation Paused"
    house.status.date = "Since Mar 2025"
  } else if (index === 5) {
    house.status.type = "Final Inspection"
    house.status.date = "Since Apr 2025"
  } else if (index === 8) {
    house.status.type = "Permit Pending"
    house.status.date = "Since Feb 2025"
  } else if (index === 12) {
    house.status.type = "Construction Paused"
    house.status.date = "Since Jan 2025"
  }
})

// Update several houses in other zones with the new status types and more specific dates
polygonData.forEach((zone, zoneIndex) => {
  if (zoneIndex > 0) {
    zone.properties.houses.forEach((house, houseIndex) => {
      if (houseIndex % 7 === 0) {
        house.status.type = "Renovation Paused"
        house.status.date = "Paused on Apr 10, 2025 - Resuming Jun 15, 2025"
      } else if (houseIndex % 11 === 0) {
        house.status.type = "Final Inspection"
        house.status.date = "Scheduled for May 25, 2025"
      } else if (houseIndex % 13 === 0) {
        house.status.type = "Permit Pending"
        house.status.date = "Application submitted Mar 5, 2025"
      } else if (houseIndex % 17 === 0) {
        house.status.type = "Construction Paused"
        house.status.date = "Paused on Feb 20, 2025 - Resuming Jul 1, 2025"
      } else if (houseIndex % 5 === 0 && house.status.type === "Under Renovation") {
        house.status.date = "Started Jan 15, 2025 - Est. completion Aug 30, 2025"
      } else if (houseIndex % 6 === 0 && house.status.type === "Under Construction") {
        house.status.date = "Started Mar 1, 2025 - Est. completion Dec 15, 2025"
      } else if (houseIndex % 8 === 0 && house.status.type === "Upcoming Renovation") {
        house.status.date = "Starting Jun 10, 2025 - Est. completion Sep 25, 2025"
      } else if (houseIndex % 9 === 0 && house.status.type === "Upcoming Construction") {
        house.status.date = "Starting Jul 5, 2025 - Est. completion Apr 20, 2026"
      }
    })
  }
})

export const CENTER_POSITION: [number, number] = [10.249231, 123.78923]
export const INITIAL_ZOOM = 18