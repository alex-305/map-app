import { useState } from "react"
import { useMapEvents } from "react-leaflet"

function MouseCoordinates() {
    const [coords, setCoords] = useState({lat:0, lng:0})

    const MouseTracker = () => {
        useMapEvents({
            mousemove: (e) => {
                const { latlng } = e
                setCoords({
                    lat: latlng.lat,
                    lng: latlng.lng
                })
            }
        })
        return null
    }

    return (
        <>
        <MouseTracker/>
        <span>{coords.lat.toFixed(3)}</span> <span>{coords.lng.toFixed(3)}</span>
        </>
    )
}

export default MouseCoordinates