import LoginForm from "./LoginForm"
import { RegisterDialog } from "./RegisterDialog"
import { Button } from "./ui/button"
import { post } from "@/scripts/http"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuSeparator
} from "./ui/dropdown-menu"

export default function LoginDropdown({ loggedIn, onLogin, onLogout }) {
    async function logout() {
        const { errors } = await post('/logout')
        if (!errors)
            onLogout()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link">{loggedIn ? "Account" : "Login"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {loggedIn === true ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <DropdownMenuGroup>
                            <div className="p-2">
                                <LoginForm onLogin={onLogin} />
                            </div>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <RegisterDialog />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Forgot password?
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )  
}