import { get } from "@/scripts/http"
import { LatLng } from "leaflet"
import { createContext, useContext, useEffect, useState } from "react"
import { useMap } from "react-leaflet"

const UserInfoContext = createContext<{
    userLocation: LatLng,
    loggedIn: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export const useUserInfo = () => useContext(UserInfoContext)

type UserInfoProviderProps = {
    children: React.ReactNode
}

export function UserInfoProvider({ children }: UserInfoProviderProps) {
    const [userLocation, setUserLocation] = useState<LatLng | null>(null)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        (async () => {
            const result = (await get('/check')).data.result
            setLoggedIn(result);
        })()
    }, [])

    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", (e) => {
            setUserLocation(e.latlng)
        })
    }, [map])

    return (
        <UserInfoContext.Provider value={{ userLocation, loggedIn, setLoggedIn }}>
            {children}
        </UserInfoContext.Provider>
    )
}
