import { mdiCog } from "@mdi/js"
import Icon from "@mdi/react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useUserInfo } from "./UserInfoContext"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { useTheme } from "@/lib/theme-provider"

function SettingsButton({ currentMapStyle, setMapStyle }){
    const { loggedIn } = useUserInfo()
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const mapStyles = [
        { name: "Default", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
        { name: "Dark", url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=5714cca8-3a6f-473e-a287-f001112f9719" },
        { name: "Light Mode", url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=5714cca8-3a6f-473e-a287-f001112f9719" },
        { name: "Transport", url: "https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png" },
    ]

    const handleMapStyleChange = (url) => {
        setMapStyle(url)
    }

    const inputStyle = theme === 'dark' 
        ? 'bg-gray-800 text-white border-gray-600'
        : 'bg-white text-black border-gray-300'

    const dropdownOptionStyle = theme === 'dark'
        ? 'bg-gray-800 text-white'
        : 'bg-white text-black'

    if (!loggedIn) return null

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className={"m-0 pl-0 px-2 bg-black text-white hover:bg-gray-800"} >
                    <Icon path={mdiCog} size={1} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 flex flex-col gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Settings</h4>
                    <p className="text-sm text-muted-foreground">
                        Customize your experience
                    </p>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center space-x-2">
                    <Switch
                        id="theme-toggle"
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                    />
                    <Label htmlFor="theme-toggle">
                        {theme === 'dark' ? 'Dark' : 'Light'} Mode
                    </Label>
                </div>

                {/* Map Style Selector */}
                <div className="flex flex-col space-y-2">
                    <Label>Map Style</Label>
                    <select
                        value={currentMapStyle}
                        onChange={(e) => handleMapStyleChange(e.target.value)}
                        className={`border rounded p-1 ${inputStyle}`}
                    >
                        {mapStyles.map((style) => (
                            <option
                                key={style.name}
                                value={style.url}
                                className={dropdownOptionStyle}
                            >
                                {style.name}
                            </option>
                        ))}
                    </select>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default SettingsButton