import LoginForm from "./LoginForm"
import { Button } from "./ui/button"
import { post } from "@/scripts/http"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { RegisterDialog } from "./RegisterDialog"
import { Separator } from "./ui/separator"
import { useUserInfo } from "./UserInfoContext"
import { ErrorToast } from '@/scripts/toast'

export default function LoginDropdown() {
    const { loggedIn, setLoggedIn } = useUserInfo()
    
    async function logout() {
        const { error } = await post('/logout')
        if (!error)
            setLoggedIn(false)
        else
            ErrorToast(error.message, error.status)
    }

    async function login() {
        setLoggedIn(true)
    }

    return loggedIn ? (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='rounded-none' variant="ghost">Account</Button>
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
                <Button className='rounded-none' variant="ghost">Login</Button>
            </PopoverTrigger>
            <PopoverContent>
                <LoginForm onLogin={login} />
                <Separator className="mt-4 mb-2"/>
                <div>
                    <RegisterDialog />
                    <Button variant="ghost">Forgot password?</Button>
                </div>
            </PopoverContent>
        </Popover>
    ) 
}

