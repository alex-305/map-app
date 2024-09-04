import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar"
import { Menubar } from "./ui/menubar"
import { mdiHome } from "@mdi/js"
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
    
    return (
        <Menubar>
            <MenubarMenu>
                <Button onClick={homeClicked} variant={"link"}><Icon path={mdiHome} size={1}/></Button>
                <MenubarTrigger>Feeds</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>All</MenubarItem>
                    <MenubarItem>Following</MenubarItem>
                    <MenubarItem>Friends</MenubarItem>
                </MenubarContent>
                <MenubarTrigger>Profile</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}

export default Navbar