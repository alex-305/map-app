// import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './App.css'

import "leaflet/dist/leaflet.css";
import NewPost from './components/NewPost';
import { useState } from 'react';
import UserLocation from './components/UserLocation';
import { LatLng } from 'leaflet';
import MouseCoordinates from './components/MouseCoordinates';
import Navbar from './components/Navbar';
import CustomControls from './components/CustomControls';
import PostContainer from './components/PostContainer'

function App() {

  const [userLocation, setUserLocation] = useState<LatLng | null>(null)

  return (
    <>
      <MapContainer 
      attributionControl={false}
      zoomControl={false}
      center={[25, -11]} 
      zoom={3}
      className="w-screen h-screen my-0 mx-0 px-0 py-0 absolute z-10"
      maxBounds={[[85,-180],[-85, 180]]}>
        <PostContainer/>
        <TileLayer className="z-0" noWrap={true} minZoom={2} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UserLocation setUserLocation={setUserLocation}/>
        <CustomControls yPosition="top" xPosition="left" className='ml-2 mt-2'>
          <Navbar userLocation={userLocation as LatLng}/>
        </CustomControls>
        <CustomControls yPosition="bottom" xPosition="right" className='mr-5 mb-5'>
          <NewPost/>
        </CustomControls>
        <div className='leaflet-bottom leaflet-left ml-1 mb-1 bg-white px-1 rounded'>
          <MouseCoordinates/>
        </div>
      </MapContainer>
    </>
  )
}

export default App
