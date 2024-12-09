import { useState, StrictMode } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import NewPost from '../components/NewPost';
import MouseCoordinates from '../components/MouseCoordinates';
import Navbar from '../components/Navbar';
import SettingsButton from '@/components/SettingsButton';
import CustomControls from '../components/CustomControls';
import PostContainer from '../components/PostContainer';
import { UserInfoProvider } from '../components/UserInfoContext';

function App() {
    const [mapStyle, setMapStyle] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")

    return (
        <StrictMode>
            <MapContainer 
                attributionControl={false}
                zoomControl={false}
                center={[25, -11]} 
                zoom={3}
                className="w-screen h-screen my-0 mx-0 px-0 py-0 absolute z-10"
                maxBounds={[[85, -180], [-85, 180]]}
            >
                <UserInfoProvider>
                    <PostContainer />
                    <TileLayer className="z-0" noWrap={true} minZoom={2} url={mapStyle} />
                    <CustomControls yPosition="top" xPosition="left" className='ml-2 mt-2'>
                        <Navbar />
                    </CustomControls>
                    <CustomControls yPosition="top" xPosition="right" className='mr-5 mb-5'>
                        <SettingsButton currentMapStyle={mapStyle} setMapStyle={setMapStyle} />
                    </CustomControls>
                    <CustomControls yPosition="bottom" xPosition="right" className='mr-5 mb-5'>
                        <NewPost />
                    </CustomControls>
                    <div className='leaflet-bottom leaflet-left ml-1 mb-1 bg-white px-1 rounded'>
                        <MouseCoordinates />
                    </div>
                </UserInfoProvider>
            </MapContainer>
        </StrictMode>
    )
}

export default App