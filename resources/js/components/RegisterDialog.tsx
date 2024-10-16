import { useContext, useState } from 'react'
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
import { toast } from 'sonner'
import { HTTPError } from '@/scripts/http'
import { useUserInfo } from './UserInfoContext'
import { ErrorToast } from '@/scripts/toast'

export function RegisterDialog() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const { userLocation, loggedIn, setLoggedIn }= useUserInfo()

  const userRegistered = () => {
    setDialogOpen(false)
    setLoggedIn(true)
    toast.success('Registration successful. Welcome!')
  }

  const registerError = (error:HTTPError) => {
    ErrorToast(error.message, error.status)
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
