import { mdiMagnifyPlusOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { useState } from "react"
import { useMap, useMapEvents } from "react-leaflet"

function MouseCoordinates() {
    const map = useMap()
    const [coords, setCoords] = useState({lat:0, lng:0})
    const [zoom, setZoom] = useState(3)

    const Tracker = () => {
        useMapEvents({
            mousemove: (e) => {
                const { latlng } = e
                setCoords({
                    lat: latlng.lat,
                    lng: latlng.lng
                })
            },
            zoomend: () => {
                setZoom(map.getZoom())
            }
        })
        return null
    }

    return (
        <>
        <Tracker/>
        <div className="flex flex-row space-x-2">
            <span>{coords.lat.toFixed(3)}</span>
            <span>{coords.lng.toFixed(3)}</span>
            <span className="flex flex-row"><Icon path={mdiMagnifyPlusOutline} size={0.8}/>{zoom}</span>
        </div>
        </>
    )
}

export default MouseCoordinates