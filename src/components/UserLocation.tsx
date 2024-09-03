import { LatLng } from "leaflet"
import { useEffect, useState } from "react"
import { Marker, useMap } from "react-leaflet"

type UserLocationProps = {
    setUserLocation:React.Dispatch<React.SetStateAction<LatLng>>
}

function UserLocation(props:UserLocationProps) {
    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", (e) => {
            props.setUserLocation(e.latlng)
        })
    }, [map])

    return null
}

export default UserLocation