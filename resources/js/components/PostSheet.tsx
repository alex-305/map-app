import { useContext, useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { post } from '@/scripts/http'
import { Post } from "@/types/Post"
import CommentList from './CommentList'
import { ErrorToast } from '@/scripts/toast'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { PostContext } from './PostContainer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { formatDate } from '@/scripts/formatDate'

interface PostSheetProps {
  post: Post,
  onComment: () => void,
  onDeleteComment: () => void;
  children: React.ReactNode
}

export function PostSheet(props: PostSheetProps) {
  const [content, setContent] = useState<string>("")
  const [open, setOpen] = useState(false)
  const { currentPost, setCurrentPost }= useContext(PostContext)

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
        <Sheet modal={false} open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild onClick={e => {
            e.stopPropagation()
            setCurrentPost(props.post)
          }}>
            {props.children}
          </SheetTrigger>
          <SheetContent
          onInteractOutside={e => {
            if (currentPost.id != props.post.id)
              setTimeout(() => {
                setOpen(false)
              }, 50)
            e.preventDefault()
          }}
          className="flex flex-col gap-4 justify-between"
          >
            <div className='shrink-0'>
              <Card style={{ backgroundColor: `#${props.post.color}27` }}>
                <CardHeader>
                  <CardTitle>Posted by {props.post.username}</CardTitle>
                  <CardDescription>Posted on {formatDate(props.post.created_at)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{props.post.content}</p>
                </CardContent>
              </Card>
              <SheetHeader className='mt-4'>
                <SheetTitle>Comments</SheetTitle>
              </SheetHeader>
            </div>

            <ScrollArea className="h-full px-4">
              <CommentList
                postId={props.post.id}
                onDeleteComment={props.onDeleteComment} // new callback for deletion
              />
            </ScrollArea>
          
            <div className='shrink-0 flex flex-col gap-2'>
              <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Say something here..."
              className='resize-none h-full'
              />
              <SheetClose asChild>
                <Button variant="default" onClick={comment}>
                  Post Comment
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
