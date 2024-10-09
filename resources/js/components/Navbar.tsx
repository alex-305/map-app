import { mdiHome, mdiMinus, mdiPlus } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"
import { LatLng } from "leaflet"
import { useMap, useMapEvents } from "react-leaflet"
import LoginDropdown from "./LoginDropdown"
import { useEffect, useState } from "react"
import { get } from "@/scripts/http"
import FeedDropdown from "./FeedDropdown"
import { useUserLocation } from "./UserLocationContext"

type NavbarProps = {
    userLocation:LatLng
}

function Navbar(props:NavbarProps) {

    const map = useMap()
    const [reachedMaxZoom, setReachedMaxZoom] = useState(false)
    const [reachedMinZoom, setReachedMinZoom] = useState(false)
    const userLocation = useUserLocation()

    // login related hooks
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            const result = (await get('/check')).data.result
            setLoggedIn(result);
            setLoading(false);
        })()
    }, [])

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

    return (
        <nav className="flex flex-row bg-white rounded-lg shadow">
            <Tracker/>
            <Button className={"m-0 pl-0 px-2 hover:bg-slate-200 rounded-r-none"} onClick={homeClicked} variant={"link"}>
                <Icon path={mdiHome} size={1}/>
            </Button>

            <FeedDropdown />            
            <LoginDropdown
            loggedIn={loggedIn}
            onLogin={() => {
                setLoggedIn(true)
                location.reload() // TODO try to find a way to avoid this
            }}
            onLogout={() => {
                setLoggedIn(false)
                location.reload() // TODO this too
            }}
            />

            <Button 
            onClick={zoomOut} 
            variant={"link"} 
            className={"p-0 rounded-none " + 
            (reachedMinZoom ? "cursor-default" : "cursor-pointer hover:bg-slate-200")}>
                <Icon color={reachedMinZoom ? "gray" : "black" } path={mdiMinus} size={1}/>
            </Button>

            <Button 
            onClick={zoomIn}
            variant={"link"} 
            className={"p-0 rounded-l-none " +
            (reachedMaxZoom ? "cursor-default" : "cursor-pointer hover:bg-slate-200")}>
                <Icon color={reachedMaxZoom ? "gray" : "black"} path={mdiPlus} size={1}/>
            </Button>
        </nav>
    )
}

export default Navbar
