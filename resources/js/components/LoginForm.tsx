import { useForm } from "react-hook-form"
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
import { LoginCreds } from "@/types/Creds"
import useAuth from "@/scripts/useAuth"
import { useEffect } from "react"

const formSchema = z.object({
    identifier: z.string().min(1, "Username or email is required"),
    password: z.string().min(1, "Password is required"),
})

export default function LoginForm() {

    const { LoginUser } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    })
    
    async function login(values: z.infer<typeof formSchema>) {
        const loggedIn = await LoginUser(values as LoginCreds)
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input id="identifier" placeholder="Username or Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input id="password" placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="flex justify-end" type="submit">Login</Button>
            </form>
        </Form>
    )
}

