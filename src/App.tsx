import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MapComponent from "@/components/map-component"
import Admin from './Admin';
import Login from './Login';
import HouseholdOwner from './HouseholdOwner';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/guard' element={<MapComponent />} />
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/household-owner' element={<HouseholdOwner />} />

      </Routes>
    </BrowserRouter>
  )
}