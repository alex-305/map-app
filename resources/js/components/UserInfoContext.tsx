import { get, post } from "@/scripts/http"
import { LatLng } from "leaflet"
import { createContext, useContext, useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import { toast } from "sonner"
import { RegistrationCreds, LoginCreds } from "@/types/Creds"
import { ErrorToast } from "@/scripts/toast"
import { User } from "@/types/User"

const UserInfoContext = createContext<{
    userLocation: LatLng | null,
    loggedIn: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    checkLoggedin: () => Promise<void>
    user: User | null
} | undefined>(undefined)

export const useUserInfo = () => useContext(UserInfoContext)

type UserInfoProviderProps = {
    children: React.ReactNode
}

export function UserInfoProvider({ children }: UserInfoProviderProps) {
    const [userLocation, setUserLocation] = useState<LatLng | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)

    const checkLoggedin = async() => {
        const {data, error} = await get('/check')
        const isLoggedIn = data.result

        if(!error) {
            if(isLoggedIn) {
                setUser(data.user)
            }
        } else {
            setUser(null)
            ErrorToast(error.message, error.status)
        }

        setLoggedIn(isLoggedIn)
    }

    useEffect(() => {
        checkLoggedin()
    }, [,loggedIn])

    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", (e) => {
            setUserLocation(e.latlng)
        })
    }, [map])

    return (
        <UserInfoContext.Provider value={{ userLocation, loggedIn, setLoggedIn, checkLoggedin, user }}>
            {children}
        </UserInfoContext.Provider>
    )
}
