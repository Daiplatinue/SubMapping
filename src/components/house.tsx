import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Home, Calendar, Info, MapPin, Phone, Mail, FileText, Clock, Ruler } from "lucide-react"
import { DialogFooter } from "@/components/ui/dialog"
import { getStatusColor, getStatusVariant, type StatusType } from "./subdivision-data"

interface Resident {
  id: number
  name: string
  role: string
  contactNumber: string
  email: string
  photo?: string
}

interface HouseDataProps {
  id: string | number
  name: string
  position: [number, number]
  occupants: number
  description: string
  status: StatusType
  address: string
  residents: Resident[]
  lastVisited: string
  yearBuilt: string
  propertyType: string
  lotArea: string
  floorArea: string
}

interface HouseProps {
  houseData: HouseDataProps
  onClose: () => void
}

export default function House({ houseData, onClose }: HouseProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col max-h-[70vh]">
      <div className="overflow-y-auto flex-1 px-1 py-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">
              <Info className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="residents">
              <Users className="h-4 w-4 mr-2" />
              Residents
            </TabsTrigger>
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-0">
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Occupants</p>
                    <p className="font-medium text-lg">
                      {houseData.status === "Commercial" || houseData.status === "Unoccupied"
                        ? "0"
                        : houseData.occupants}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Home className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant={getStatusVariant(houseData.status)} className="mt-1">
                      {houseData.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Location Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">Address</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{houseData.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">Year Built</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{houseData.yearBuilt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">Last Visited</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{houseData.lastVisited}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    <span className="text-sm">Property Type</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{houseData.propertyType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-sm">Lot Area</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{houseData.lotArea}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-sm">Floor Area</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{houseData.floorArea}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="residents" className="mt-0 space-y-4">
            {houseData.status === "Commercial" ? (
              <Card className="mb-3 p-4">
                <div className="text-center py-6">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No Occupants</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This is a commercial facility and does not have residents.
                  </p>
                </div>
              </Card>
            ) : houseData.status === "Unoccupied" ? (
              <Card className="mb-3 p-4">
                <div className="text-center py-6">
                  <Home className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">Unoccupied</h3>
                  <p className="text-sm text-muted-foreground mt-1">This residence currently has no occupants.</p>
                </div>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Residents Information</h3>
                  <Badge>{houseData.residents.length} Residents</Badge>
                </div>

                {houseData.residents.map((resident) => (
                  <Card key={resident.id} className="mb-3">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={resident.photo || "/placeholder.svg?height=48&width=48"}
                            alt={resident.name}
                          />
                          <AvatarFallback>
                            {resident.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-base">{resident.name}</h3>
                              <Badge variant="outline" className="mt-1">
                                {resident.role}
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{resident.contactNumber}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{resident.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">House Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{houseData.description}</p>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">House Status</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(houseData.status) }}
                    ></div>
                    <Badge variant={getStatusVariant(houseData.status)}>{houseData.status}</Badge>
                  </div>

                  <h4 className="text-sm font-medium mb-2">Coordinates</h4>
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    [{houseData.position[0].toFixed(6)}, {houseData.position[1].toFixed(6)}]
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <DialogFooter className="flex gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" onClick={onClose} className="w-full">
          Close
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            // Generate a random phone number for simulation
            const randomPhone = `+63 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`
            alert(`Calling resident at ${randomPhone}`)
            onClose()
          }}
        >
          Contact Residents
        </Button>
      </DialogFooter>
    </div>
  )
}