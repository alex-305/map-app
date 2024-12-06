import LoginForm from "./LoginForm"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { RegisterDialog } from "./RegisterDialog"
import { UpdateUserDialog } from "./UpdateUserDialog"
import { Separator } from "./ui/separator"
import { useUserInfo } from "./UserInfoContext"
import useAuth from "@/scripts/useAuth"
import { formatDate } from "@/scripts/formatDate"
import { ForgotPasswordDialog } from "./ForgotPasswordDialog"
import { useState } from 'react';
import { UserPostsDialog } from "./UserPostsDialog"




export default function LoginDropdown() {
    const { loggedIn, user } = useUserInfo()
    const { LogoutUser } = useAuth()
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    
    async function logout() {
        const loggedOut = await LogoutUser()
    }
    const handleUpdateClick = () => {
        setIsUpdateDialogOpen(true);
    };

    const handleCloseUpdateDialog = () => {
        setIsUpdateDialogOpen(false);
    };

    return loggedIn ? (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='rounded-none' variant="ghost">Account</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center">
                    <div>
                        Hey <span className="font-bold">{
                        user?.username ?? 
                        <span className="italic">Anonymous User</span>}</span>!
                    </div>
                    <div>Member since {formatDate(user?.created_at) ?? "Unknown"}</div>
                </div>
                <div className="flex">
                    <UpdateUserDialog />
                    <UserPostsDialog />
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
                    <ForgotPasswordDialog />
                </div>
            </PopoverContent>
        </Popover>
    ) 
}

