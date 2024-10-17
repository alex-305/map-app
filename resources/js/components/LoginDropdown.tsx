import LoginForm from "./LoginForm"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { RegisterDialog } from "./RegisterDialog"
import { Separator } from "./ui/separator"
import { useUserInfo } from "./UserInfoContext"
import useAuth from "@/scripts/useAuth"

export default function LoginDropdown() {
    const { loggedIn, user } = useUserInfo()
    const { LogoutUser } = useAuth()
    
    async function logout() {
        const loggedOut = await LogoutUser()
    }

    return loggedIn ? (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='rounded-none' variant="ghost">Account</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto flex flex-col gap-4">
                <div>Hey <span className="font-bold">{
                    user?.username ?? 
                    <span className="italic">Anonymous User</span>}</span>!
                </div>
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
                <LoginForm />
                <Separator className="mt-4 mb-2"/>
                <div>
                    <RegisterDialog />
                    <Button variant="ghost">Forgot password?</Button>
                </div>
            </PopoverContent>
        </Popover>
    ) 
}

