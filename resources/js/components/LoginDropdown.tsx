import LoginForm from "./LoginForm"
import { Button } from "./ui/button"
import { post } from "@/scripts/http"
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
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link">Account</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto flex flex-col gap-4">
                <div className="flex">
                    <Button variant="link">Settings</Button>
                    <Button variant="link">My Posts</Button>
                </div>
                <Button onClick={logout}>Logout</Button>
            </PopoverContent>
        </Popover>
    ) : (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link">Login</Button>
            </PopoverTrigger>
            <PopoverContent>
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

