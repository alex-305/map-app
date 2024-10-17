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
import { HTTPError } from '@/scripts/http'
import { ErrorToast } from '@/scripts/toast'

export function RegisterDialog() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const userRegistered = () => {
    setDialogOpen(false)
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
            <RegisterForm onRegister={userRegistered}/>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
