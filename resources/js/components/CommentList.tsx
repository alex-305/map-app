import { useUserInfo } from "@/components/UserInfoContext";
import { get, del } from "@/scripts/http";
import { useEffect, useState } from "react";
import { Comment } from "@/types/Comment";
import { formatDate } from "@/scripts/formatDate";
import { Separator } from "./ui/separator";

interface CommentListProps{
    postId: number;              // post ID to fetch comments
    onDeleteComment: () => void; // for when a comment is deleted
}

export default function CommentList({ postId, onDeleteComment }: CommentListProps) {
    const { user } = useUserInfo(); // use useUserInfo to get user
    const authorId = user?.id;      // get the logged in user's ID

    const [comments, setComments] = useState<Array<Comment>>(null);

    useEffect(() => {
        if(comments === null) {
            (async () =>{
                const { data, errors } = await get(`/posts/${postId}/comments`);
                if(!errors) setComments(data);
            })();
        }
    }, [postId, comments]);

    const handleDelete = async (commentId: number) => {
        if(confirm("Are you sure you want to delete this comment?")) {
            const { errors } = await del(`/posts/${postId}/comments/${commentId}`);
            if(!errors){
                setComments(comments.filter((comment) => comment.id !== commentId));
                onDeleteComment(); // flag deletion
            } else {
                alert("Failed to delete the comment.");
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {comments?.length > 0 &&
                Array.isArray(comments) &&
                comments.map((c, i) => {
                    return (
                        <div className="flex flex-col py-0" key={i}>
                            <div className="flex justify-between w-[96%]">
                                <span>{c.content}</span>
                                <div className="flex items-center gap-2">
                                    {c.author_id === authorId &&(
                                        <>
                                            <span className="text-gray-500 font-mono text-sm">OP</span>
                                            <button
                                                className="text-red-500 text-sm hover:underline"
                                                onClick={() => handleDelete(c.id)}
                                            >
                                                delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">
                                posted by <span className="font-semibold">{c.username}</span> on{" "}
                                {formatDate(c.created_at)}
                            </span>
                            {i < comments.length - 1 && <Separator className="mt-4" />}
                        </div>
                    );
                })}
        </div>
    );
}
