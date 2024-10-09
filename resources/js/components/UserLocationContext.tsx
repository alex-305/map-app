import { LatLng } from "leaflet"
import { createContext, useContext, useEffect, useState } from "react"
import { Marker, useMap } from "react-leaflet"

const UserLocationContext = createContext<LatLng | null>(null)

export const useUserLocation = () => useContext(UserLocationContext)

type UserLocationProviderProps = {
    children: React.ReactNode
}

export function UserLocationProvider({ children }: UserLocationProviderProps) {

    const [userLocation, setUserLocation] = useState<LatLng | null>(null)

    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", (e) => {
            setUserLocation(e.latlng)
        })
    }, [map])

    return (
        <UserLocationContext.Provider value={userLocation}>
            {children}
        </UserLocationContext.Provider>
    )
}