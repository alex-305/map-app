import { get } from "@/scripts/http";
import { useEffect, useState } from "react";
import { Comment } from "@/types/Comment";
import { ScrollArea } from "./ui/scroll-area";
import { formatDate } from "@/scripts/formatDate";
import { Separator } from "./ui/separator";

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
        {comments?.length>0 && Array.isArray(comments) && comments.map((c, i) => {
          return (
            <div className="flex flex-col py-0" key={i}>
              <div className="flex justify-between w-[96%]">
                <span>{c.content}</span>
                {c.author_id === authorId && (
                  <span className="text-gray-500 font-mono text-sm">OP</span>
                )}
              </div>
              <span className="text-xs text-gray-500">posted by <span className="font-semibold">
                {c.username}
                </span> on {formatDate(c.created_at)}</span>
                {i<comments.length-1 && <Separator className="mt-4"/>}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
