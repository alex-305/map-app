import { mdiHome, mdiMinus, mdiPlus } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"
import { useMap, useMapEvents } from "react-leaflet"
import LoginDropdown from "./LoginDropdown"
import { useState } from "react"
import FeedDropdown from "./FeedDropdown"
import { useUserInfo } from "./UserInfoContext"
import { toast } from "sonner"
import { HTTPError } from "@/scripts/http"
import { ErrorToast } from '@/scripts/toast'

function Navbar() {
    const map = useMap()
    const [reachedMaxZoom, setReachedMaxZoom] = useState(false)
    const [reachedMinZoom, setReachedMinZoom] = useState(false)

    const { userLocation, loggedIn }= useUserInfo()

    const Tracker = () => {
        useMapEvents({
            zoomend: () => {
                const zoom = map.getZoom()
                setReachedMaxZoom(map.getMaxZoom()===zoom)
                setReachedMinZoom(map.getMinZoom()===zoom)
            }
        })
        return null
    }

    const homeClicked = () => {
        map.flyTo(userLocation, 13, {
            duration: 1
        })
    }

    const zoomOut = () => {
        map.zoomOut()
    }

    const zoomIn = () => {
        map.zoomIn()
    }

    return loggedIn !== null ? (
        <nav className="flex flex-row bg-white dark:bg-black rounded-lg shadow">
            <Tracker/>
            <Button className={"m-0 pl-0 px-2 rounded-r-none"} onClick={homeClicked} variant={"ghost"}>
                <Icon path={mdiHome} size={1}/>
            </Button>

            <FeedDropdown />            
            <LoginDropdown/>

            <Button 
            onClick={zoomOut} 
            variant={"ghost"} 
            className={"p-0 rounded-none"}>
                <Icon className={reachedMinZoom ? "cursor-default text-gray-500" : "cursor-pointer text-black dark:text-white"} path={mdiMinus} size={1}/>
            </Button>

            <Button 
            onClick={zoomIn}
            variant={"ghost"} 
            className={"p-0 rounded-l-none"}>
                <Icon className={reachedMaxZoom ? "cursor-default text-gray-500" : "cursor-pointer text-black dark:text-white"} path={mdiPlus} size={1}/>
            </Button>
        </nav>
    ) : <></>
}

export default Navbar
