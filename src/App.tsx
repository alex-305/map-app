// import { useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import './App.css'

import "leaflet/dist/leaflet.css";
import NewPost from './components/NewPost';
import { useEffect, useState } from 'react';
import UserLocation from './components/UserLocation';
import { LatLng } from 'leaflet';
import MouseCoordinates from './components/MouseCoordinates';
import Navbar from './components/Navbar';


function App() {

  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [posting, setPosting] = useState(false)

  const flyHome = () => {
    
  }

  return (
    <>
      <MapContainer 
      attributionControl={false}
      zoomControl={false}
      center={[32, -45]} 
      zoom={3} 
      className="w-screen h-screen my-0 mx-0 px-0 py-0 absolute z-10">
        <TileLayer className="z-0" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UserLocation setUserLocation={()=>setUserLocation}/>
        <div className='leaflet-bottom leaflet-left ml-1 mb-1 bg-white px-1 rounded'>
          <MouseCoordinates/>
        </div>
      </MapContainer>

      <div className="absolute top-0 left-0 z-50">
        <Navbar/>
      </div>

      <div className="absolute bottom-0 right-0 p-4">
        <NewPost setPosting={setPosting} posting={posting}/>
      </div>
    </>
  )
}

export default App
