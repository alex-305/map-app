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
            <Button className={"m-0 pl-0 px-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-r-none"} variant='link'>Register</Button>
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
