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
  return (
    <>
      <div>
         <Dialog>
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
            <RegisterForm onRegister={() => {}}/>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
