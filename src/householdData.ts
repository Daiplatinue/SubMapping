import type { ReactNode } from "react"

export interface PaymentLog {
  id: number
  type: string
  amount: number
  date: string
  status: string
  details: string
}

export interface RequestIncident {
  id: number
  type: string
  status: string
  date: string
  description: string
}

export interface ConsumptionCardProps {
  icon: ReactNode
  title: string
  value: number
  unit: string
  change: number
  color: string
  payment: number
  threshold: number
  rate: number
  exceededRate: number
}

export interface WaterConsumption {
  current: number
  previous: number
  history: number[]
}

export interface ElectricityConsumption {
  current: number
  previous: number
  history: number[]
}

export interface Payment {
  current: number
  rate: number
  threshold: number
  exceededRate: number
}

export interface HouseholdData {
  id: string
  address: string
  blockName: string
  blockNumber: string
  occupants: number
  yearBuilt: number
  waterConsumption: WaterConsumption
  electricityConsumption: ElectricityConsumption
  waterPayment: Payment
  electricityPayment: Payment
  paymentLogs: PaymentLog[]
  requests: RequestIncident[]
  incidents: RequestIncident[]
}

export const householdData: HouseholdData = {
  id: "A3",
  address: "A3 Sugbo St",
  blockName: "Sugbo GK Village Block A",
  blockNumber: "A",
  occupants: 5,
  yearBuilt: 2010,
  waterConsumption: {
    current: 180,
    previous: 165,
    history: [150, 155, 160, 165, 170, 180],
  },
  electricityConsumption: {
    current: 220,
    previous: 210,
    history: [190, 195, 200, 205, 210, 220],
  },
  waterPayment: {
    current: 1800,
    rate: 10,
    threshold: 150,
    exceededRate: 15,
  },
  electricityPayment: {
    current: 2640,
    rate: 12,
    threshold: 200,
    exceededRate: 18,
  },
  paymentLogs: [
    {
      id: 1,
      type: "Utilities",
      amount: 4170,
      date: "2024-02-15",
      status: "Paid",
      details: "Water: 165m³ (₱1,650), Electricity: 210kWh (₱2,520)",
    },
    {
      id: 2,
      type: "Utilities",
      amount: 3950,
      date: "2024-01-15",
      status: "Paid",
      details: "Water: 155m³ (₱1,550), Electricity: 200kWh (₱2,400)",
    },
    {
      id: 3,
      type: "Utilities",
      amount: 3750,
      date: "2023-12-15",
      status: "Paid",
      details: "Water: 150m³ (₱1,500), Electricity: 195kWh (₱2,250)",
    },
    {
      id: 4,
      type: "Association Dues",
      amount: 500,
      date: "2024-02-01",
      status: "Paid",
      details: "Monthly subdivision maintenance fee",
    },
  ],
  requests: [
    { id: 1, type: "Maintenance", status: "Completed", date: "2023-12-15", description: "Water pipe leakage" },
  ],
  incidents: [
    { id: 1, type: "Security", status: "Resolved", date: "2023-11-10", description: "Suspicious person near house" },
  ],
}