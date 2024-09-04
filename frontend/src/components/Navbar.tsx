import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar"
import { Separator } from "./ui/separator"
import { mdiHome, mdiMinus, mdiPlus } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"
import { LatLng } from "leaflet"
import { useMap } from "react-leaflet"

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
    
    return (
        <Menubar>
            <Button onClick={homeClicked} variant={"link"}><Icon path={mdiHome} size={1}/></Button>
            <MenubarMenu>
                <MenubarTrigger>Feeds</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>All</MenubarItem>
                    <MenubarItem>Following</MenubarItem>
                    <MenubarItem>Friends</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Account</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Your posts</MenubarItem>
                    <MenubarItem>Options</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <Button onClick={zoomOut} variant={"link"} className="p-0"><Icon path={mdiMinus} size={1}/></Button>
            <Separator orientation="vertical" className="my-2"/>
            <Button onClick={zoomIn} variant={"link"} className="p-0"><Icon path={mdiPlus} size={1}/></Button>
        </Menubar>
    )
}

export default Navbar