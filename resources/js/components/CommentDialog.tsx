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
import { Textarea } from './ui/textarea'
import { post } from '@/scripts/http'
import { DialogClose } from '@radix-ui/react-dialog'
import { Post } from "@/types/Post"
import CommentList from './CommentList'
import { ErrorToast } from '@/scripts/toast'

interface CommentDialogProps {
  post: Post,
  onComment: () => void,
  children: React.ReactNode
}

export function CommentDialog(props: CommentDialogProps) {
  const [content, setContent] = useState<string>("")

  async function comment() {
    const { error } = await post(`/posts/${props.post.id}/comments`, { content })
    if (!error) {
      props.onComment()
      setContent("")
    } else {
      ErrorToast(error.message, error.status)
    }
  }

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
            <CommentList authorId={props.post.author_id} postId={props.post.id}/>
            <div className='h-16'>
              <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Say something here..."
              className='resize-none h-full'
              />
            </div>
            <DialogClose asChild>
              <Button onClick={comment}>Post Comment</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
