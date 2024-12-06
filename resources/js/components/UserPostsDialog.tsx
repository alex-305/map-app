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
import UserPostsForm from './UserPostsForm'
import { HTTPError } from '@/scripts/http'
import { ErrorToast } from '@/scripts/toast'

export function UserPostsDialog() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const viewPosts = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <div>
         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='link' >My Posts</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <div>
                <DialogTitle>All User Posts</DialogTitle>
                <DialogDescription>View all your Posts!</DialogDescription>
              </div>
            </DialogHeader>
            <UserPostsForm onView={viewPosts}/>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}