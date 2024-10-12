import { useState } from 'react'
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

export function RegisterDialog() {
  const [open, setOpen] = useState(false)

  const handleRegister = (loginData) => {
    console.log('User registered:', loginData)
    setOpen(false)
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="m-0 pl-0 px-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-r-none" variant='link'> Register </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Make a new account today!</DialogDescription>
        </DialogHeader>
        <RegisterForm onRegister={handleRegister}/>
      </DialogContent>
    </Dialog>
  )
}
