import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar"
import { Separator } from "./ui/separator"
import { mdiHome, mdiMinus, mdiPlus } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"
import { LatLng } from "leaflet"
import { useMap } from "react-leaflet"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

type NavbarProps = {
    userLocation:LatLng
}

function Navbar(props:NavbarProps) {

    const map = useMap()

    const homeClicked = () => {
        map.flyTo(props.userLocation, 13)
    }

    const zoomOut = () => {
        map.zoomOut()
    }

    const zoomIn = () => {
        map.zoomIn()
    }

    const feedOptions = ["All", "Following", "Latest"]
    
    return (
        <nav className="flex flex-row bg-white rounded-lg shadow">
            <Button className="m-0 px-2" onClick={homeClicked} variant={"link"}><Icon path={mdiHome} size={1}/></Button>
            <Separator orientation="vertical" className="my-2"/>
            <div className="px-2 cursor-pointer">
                <HoverCard openDelay={0}>
                    <HoverCardTrigger className="">
                        <div className="h-100 text-black text-lg flex flex-col text-end">Feeds</div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-30">
                        <div className="flex flex-col justify-between space-x-4">
                            <RadioGroup>
                                {feedOptions.map((item, index) => (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={item.toLowerCase()} id={index.toString()}/>
                                        <Label htmlFor={index.toString()}>{item}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="pr-4 cursor-pointer">
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="text-black text-lg text-center">Account</div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <div className="flex flex-col">
                            <Button className="p-0 my-1" variant="link">Your posts</Button>
                            <Button className="p-0 my-1" variant="link">Options</Button>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <Button onClick={zoomOut} variant={"link"} className="p-0"><Icon path={mdiMinus} size={1}/></Button>
            <Separator orientation="vertical" className="my-2"/>
            <Button onClick={zoomIn} variant={"link"} className="p-0"><Icon path={mdiPlus} size={1}/></Button>
        </nav>
    )
}

export default Navbar