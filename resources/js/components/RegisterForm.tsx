import { useState } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod" 
import { zodResolver } from "@hookform/resolvers/zod"
import { post } from "@/scripts/http"
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

const formSchema = z.object({
    username: z.string().min(1, "Invalid username"),
    email: z.string().email("Please enter a valid and unique email"),
    password: z.string().regex(
        /^(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and include at least one number"
    )
})

export default function RegisterForm({ onRegister }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    async function register(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
            const registerResponse = await post("/register", values);
            if (registerResponse.errors) {
                console.log("Registration failed");
            }

            const loginData = {
                email: values.email,
                password: values.password
            };
            const loginInfo = await post("/login", loginData);
            if (loginInfo.errors) {
                console.log("Login failed");
            }

            if(!loginInfo.errors && !registerResponse.errors) {
                onRegister(loginInfo.data);
            }
        setIsSubmitting(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(register)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input id="name" placeholder="johndoe123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input id="email" placeholder="hello@mail.com" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input id="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
            </form>
        </Form>
    )
}

