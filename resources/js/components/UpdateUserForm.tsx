import { useState } from "react"
import { useForm } from "react-hook-form"
import { useUserInfo } from "@/components/UserInfoContext"
import { z } from "zod" 
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuth from "@/scripts/useAuth"

// Separate schemas for different update types
const usernameSchema = z.object({
    username: z.string().min(1, "Invalid username"),
})

const emailSchema = z.object({
    email: z.string().email("Please enter a valid and unique email"),
})

const passwordSchema = z.object({
    password: z.string().regex(
        /^(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and include at least one number"
    ),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: "Passwords do not match"
})

export default function UpdateUserForm({ onUpdate }) {
    const { VerifyPassword, UpdateUsername, UpdateEmail, UpdatePassword } = useAuth()
    const [isVerified, setIsVerified] = useState(false)
    const [verificationError, setVerificationError] = useState("")
    const [updateAction, setUpdateAction] = useState<"username" | "email" | "password" | null>(null)
    const [updateError, setUpdateError] = useState("")
    const { user } = useUserInfo()

    // Separate forms for different update types
    const usernameForm = useForm({
        resolver: zodResolver(usernameSchema),
        defaultValues: { username: "" }
    })

    const emailForm = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" }
    })

    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: "", password_confirmation: "" }
    })

    async function verifyPassword(event: React.FormEvent) {
        event.preventDefault()
        const password = (event.target as any).elements.password.value
        const verified = await VerifyPassword(password)

        if (verified) {
            setIsVerified(true)
            setVerificationError("")
        } else {
            setVerificationError("Incorrect password")
        }
    }

    function handleUpdateAction(action: "username" | "email" | "password") {
        setUpdateAction(action)
        setUpdateError("")
    }

    async function handleUsernameUpdate(values: { username: string }) {
        console.log(values.username)
        const response = await UpdateUsername(values.username);
            
        if (response) {
            onUpdate();
        } else {
            setUpdateError("Failed to update username. Please try again.");
        }
    }

    async function handleEmailUpdate(values: { email: string }) {
        const response = await UpdateEmail(values.email);
            if (response) {
            onUpdate();
        } else {
            setUpdateError("Failed to update email. Please try again.");
        }
    }

    async function handlePasswordUpdate(values: { password: string, password_confirmation: string }) {
        const response = await UpdatePassword(values.password, values.password_confirmation);
        if (response) {
            onUpdate();
        } else {
            setUpdateError("Failed to update password. Please try again.");
        }
    }

    return (
        <div className="space-y-4">
            {!isVerified ? (
                <form onSubmit={verifyPassword}>
                    <div className="space-y-2">
                        <label className="dark:text-zinc-50" htmlFor="password">Enter your password to proceed</label>
                        <Input id="password" placeholder="Enter Password" type="password" />
                        {verificationError && <p className="text-red-500 dark:text-red-900">{verificationError}</p>}
                    </div>
                    <Button type="submit" className="mt-4">Verify</Button>
                </form>
            ) : (
                <>
                    {!updateAction ? (
                        <>
                            <div className="dark:text-zinc-50 text-center">
                                Username: <span className="font-bold">{user?.username ??
                                <span className="italic">Anonymous User</span>}</span>
                            </div>
                            <div className="dark:text-zinc-50 text-center pb-2">
                                Email: <span className="font-bold">{user?.email ??
                                <span className="italic">Unknown Email</span>}</span>
                            </div>
                            <div className="flex flex-col space-y-4 w-3/4 mx-auto">
                                <Button onClick={() => handleUpdateAction("username")}>Update Username</Button>
                                <Button onClick={() => handleUpdateAction("email")}>Update Email</Button>
                                <Button onClick={() => handleUpdateAction("password")}>Update Password</Button>
                            </div></>
                    ) : (
                        <div className="space-y-4">                
                            {updateAction === "username" && (
                                <Form {...usernameForm}>
                                    <form onSubmit={usernameForm.handleSubmit(handleUsernameUpdate)} className="space-y-4">
                                        <FormField
                                            control={usernameForm.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Enter New Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="johndoe123" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex flex-row space-x-4">
                                            <Button type="submit">Update Username</Button>
                                            <Button onClick={() => setUpdateAction(null)} > Back to Menu </Button>
                                        </div>
                                        
                                    </form>
                                </Form>
                            )}

                            {updateAction === "email" && (
                                <Form {...emailForm}>
                                    <form onSubmit={emailForm.handleSubmit(handleEmailUpdate)} className="space-y-4">
                                        <FormField
                                            control={emailForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Enter New Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="hello@mail.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex flex-row space-x-4">
                                            <Button type="submit">Update Email</Button>
                                            <Button onClick={() => setUpdateAction(null)} > Back to Menu </Button>
                                        </div>
                                    </form>
                                </Form>
                            )}

                            {updateAction === "password" && (
                                <Form {...passwordForm}>
                                    <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                                        <FormField
                                            control={passwordForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Enter New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={passwordForm.control}
                                            name="password_confirmation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm New Password</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder="Retype password" 
                                                            type="password" 
                                                            {...field} 
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex flex-row space-x-4">
                                            <Button type="submit">Update Password</Button>
                                            <Button onClick={() => setUpdateAction(null)} > Back to Menu </Button>
                                        </div>
                                    </form>
                                </Form>
                            )}
                            {updateError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    {updateError}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}