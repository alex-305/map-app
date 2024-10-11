import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Textarea } from './ui/textarea'
import { post } from '@/scripts/http'
import { DialogClose } from '@radix-ui/react-dialog'
import { Post } from "@/types/Post"

interface CommentDialogProps {
  post: Post,
  onComment: () => void,
  children: React.ReactNode
}

export function CommentDialog(props: CommentDialogProps) {
  const [content, setContent] = useState<string>("")

  async function comment() {
    const { errors } = await post(`/posts/${props.post.id}/comments`, { content })
    if (!errors) {
      props.onComment()
      setContent("")
    }
  }

  useEffect(() => {
    
  })

  return (
    <>
      <div>
         <Dialog>
          <DialogTrigger asChild>
            {props.children}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div>
                <DialogTitle>Comment</DialogTitle>
                <DialogDescription>What do you have to say?</DialogDescription>
              </div>
            </DialogHeader>
            <div className='h-32'>
              <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Say something here..."
              className='resize-none h-full'
              />
            </div>
            <DialogClose asChild>
              <Button onClick={comment}>Submit</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
