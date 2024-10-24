import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import useAuth from "@/scripts/useAuth"

const formSchema = z.object({
  email: z.string().email("Please enter your email address"),
})

export default function ForgotPasswordForm({ onReset }) {
  const { ForgotPassword } = useAuth()

  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
    },
    
  })

  async function resetPassword(values) {
    console.log(values); // check the email sent 
    const reset = await ForgotPassword(values.email)
    if (reset) {
      onReset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input id="email" placeholder="youremail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Reset Password</Button>
      </form>
    </Form>
  )
}
