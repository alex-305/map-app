import { get, post } from "@/scripts/http"
import { LatLng } from "leaflet"
import { createContext, useContext, useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import { toast } from "sonner"
import { RegistrationCreds, LoginCreds } from "@/types/Creds"
import { ErrorToast } from "@/scripts/toast"

const UserInfoContext = createContext<{
    userLocation: LatLng | null,
    loggedIn: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    checkLoggedin: () => Promise<void>
} | undefined>(undefined)

export const useUserInfo = () => useContext(UserInfoContext)

type UserInfoProviderProps = {
    children: React.ReactNode
}

export function UserInfoProvider({ children }: UserInfoProviderProps) {
    const [userLocation, setUserLocation] = useState<LatLng | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const checkLoggedin = async() => {
        const {data} = (await get('/check')).data.result
        setLoggedIn(data);
    }

    useEffect(() => {
        checkLoggedin()
    }, [])

    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", (e) => {
            setUserLocation(e.latlng)
        })
    }, [map])

    return (
        <UserInfoContext.Provider value={{ userLocation, loggedIn, setLoggedIn, checkLoggedin }}>
            {children}
        </UserInfoContext.Provider>
    )
}
