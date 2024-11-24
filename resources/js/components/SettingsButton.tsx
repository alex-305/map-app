import { mdiCog } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"
import { useUserInfo } from "./UserInfoContext"

function SettingsButton() {
    const { loggedIn }= useUserInfo()

    return loggedIn === true ? (
        <nav className="flex flex-row bg-white dark:bg-black rounded-lg shadow">
            <a href="/settings">
                <Button className={"m-0 pl-0 px-2"} variant={"ghost"}>
                    <Icon path={mdiCog} size={1}/>
                </Button>
            </a>
        </nav>
    ) : <></>
}

export default SettingsButton