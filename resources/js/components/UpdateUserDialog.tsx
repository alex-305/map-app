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
import UpdateUserForm from './UpdateUserForm'
import { HTTPError } from '@/scripts/http'
import { ErrorToast } from '@/scripts/toast'

export function UpdateUserDialog() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const userUpdated = () => {
    setDialogOpen(false)
    window.location.reload(); // Reload the page to see changes
  }

  return (
    <>
      <div>
         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='link'>Account Settings</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div>
                <DialogTitle>Account Settings</DialogTitle>
                <DialogDescription>Update your account information!</DialogDescription>
              </div>
            </DialogHeader>
            <UpdateUserForm onUpdate={userUpdated}/>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
