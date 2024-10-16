import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import RegisterForm from './RegisterForm'
import { useState } from 'react'
import { toast } from 'sonner'
import { HTTPError } from '@/scripts/http'

export function RegisterDialog() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const userRegistered = () => {
    setDialogOpen(false)
    toast.success('Registration successful. Welcome!')
  }

  const registerError = (error:HTTPError) => {
    toast.error(error.message, {
      description: `Error: Request failed with status ${error.status}`,
      duration: 2000
    })
  }

  return (
    <>
      <div>
         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='link'>Register</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div>
                <DialogTitle>Register</DialogTitle>
                <DialogDescription>Make a new account today!</DialogDescription>
              </div>
            </DialogHeader>
            <RegisterForm onRegister={userRegistered} onError={registerError}/>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
