import { mdiHome, mdiMinus, mdiPlus } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"
import { LatLng } from "leaflet"
import { useMap, useMapEvents } from "react-leaflet"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import Hoverable from "./Hoverable"
import { useState } from "react"

type NavbarProps = {
    userLocation:LatLng
}

function Navbar(props:NavbarProps) {

    const map = useMap()
    const [reachedMaxZoom, setReachedMaxZoom] = useState(false)
    const [reachedMinZoom, setReachedMinZoom] = useState(false)

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
        map.flyTo(props.userLocation, 13)
    }

    const zoomOut = () => {
        map.zoomOut()
    }

    const zoomIn = () => {
        map.zoomIn()
    }

    const feedOptions = ["Trending", "Following", "Latest"]
    
    return (
        <nav className="flex flex-row bg-white rounded-lg shadow">
            <Tracker/>
            <Button className={"m-0 pl-0 px-2 hover:bg-slate-200 rounded-r-none"} onClick={homeClicked} variant={"link"}>
                <Icon path={mdiHome} size={1}/>
            </Button>

            <Hoverable hoverColor={"slate-200"} title="Feeds">
                <RadioGroup>
                    {feedOptions.map((item, index) => (
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={item.toLowerCase()} id={index.toString()}/>
                            <Label htmlFor={index.toString()}>{item}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </Hoverable>
            
            <Hoverable hoverColor={"slate-200"} title="Account">
                <div className="flex flex-col">
                    <Button className="p-0 my-1" variant="link">Your posts</Button>
                    <Button className="p-0 my-1" variant="link">Options</Button>
                </div>
            </Hoverable>

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