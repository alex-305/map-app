import { MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar"
import { Menubar } from "./ui/menubar"
import { mdiHome } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"

function Navbar() {

    return (
        <Menubar>
            <MenubarMenu>
                <Button variant={"link"}><Icon path={mdiHome} size={1}/></Button>
                <MenubarTrigger>Friends</MenubarTrigger>
                <MenubarTrigger>Profile</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}

export default Navbar