import { useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import ForgotPasswordForm from "./ForgotPasswordForm"

export function ForgotPasswordDialog(){
  const [dialogOpen, setDialogOpen] = useState(false)

  const passwordReset = () => {
    setDialogOpen(false)
  }

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="link">Forgot password?</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Enter your email to reset your password.</DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onReset={passwordReset} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
