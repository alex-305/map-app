import LoginForm from "./LoginForm"
import { Button } from "./ui/button"
import { post } from "@/scripts/http"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "./ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { RegisterDialog } from "./RegisterDialog"
import { Separator } from "./ui/separator"

export default function LoginDropdown({ loggedIn, onLogin, onLogout }) {
    async function logout() {
        const { errors } = await post('/logout')
        if (!errors)
            onLogout()
    }

    return loggedIn ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()} className="w-56">
                <DropdownMenuItem>
                    Your Posts
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link">Login</Button>
            </PopoverTrigger>
            <PopoverContent >
                <LoginForm onLogin={onLogin} />
                <Separator className="mt-4 mb-2"/>
                <div>
                    <RegisterDialog />
                    <Button className="text-muted-foreground" variant="link">Forgot password?</Button>
                </div>
            </PopoverContent>
        </Popover>
    ) 
}

