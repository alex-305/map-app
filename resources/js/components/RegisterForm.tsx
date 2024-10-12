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
    name: z.string().min(1, "Invalid username"),
    email: z.string().email("Please enter a valid and unique email"),
    password: z.string().regex(
        /^(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and include at least one number"
    )
})

export default function RegisterForm({ onRegister }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function register(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        setError(null);
        try {
            const registerResponse = await post("/register", values);
            if (registerResponse.errors) {
                throw new Error(registerResponse.errors.message || "Registration failed");
            }

            const loginData = {
                email: values.email,
                password: values.password
            };
            const loginInfo = await post("/login", loginData);
            if (loginInfo.errors) {
                throw new Error(loginInfo.errors.message || "Login failed");
            }

            // Success
            onRegister(loginInfo.data);
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(register)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
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

