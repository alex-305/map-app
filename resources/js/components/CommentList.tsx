import { get } from "@/scripts/http";
import { useEffect, useState } from "react";
import { Comment } from "@/types/Post";
import { ScrollArea } from "./ui/scroll-area";

export default function CommentList({ authorId, postId }) {
  const [comments, setComments] = useState<Array<Comment>>(null)

  useEffect(() => {
    if (comments === null)
      (async () => {
        const { data, errors } = await get(`/posts/${postId}/comments`)
        if (!errors)
          setComments(data)
      })()
  })

  return (
    <ScrollArea className="h-[200px]">
      <div className="flex flex-col gap-4">
        {comments && comments.map((c, i) => {
          return (
            <div className="flex flex-col" key={i}>
              <div className="flex justify-between w-[96%]">
                <span>{c.content}</span>
                {c.author_id === authorId && (
                  <span className="text-gray-500 font-mono text-sm">OP</span>
                )}
              </div>
              <span className="text-xs text-gray-500">posted on {(new Date(c.created_at)).toLocaleDateString('en-US')}</span>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
