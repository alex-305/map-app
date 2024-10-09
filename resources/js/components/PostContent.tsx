import { post, del } from "@/scripts/http"
import { Post } from "@/types/Post"
import { mdiHeart, mdiHeartOutline, mdiCommentOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { get } from "../scripts/http"


type PostContentProps = {
    post:Post
}

function PostContent(props:PostContentProps) {

    const [isLiked, setIsLiked] = useState<boolean>(false)

    const [isJustLiked, setJustLiked] = useState<boolean>(false)

    const likePost = async() => {
        const response = await post(`/posts/${props.post.id}/like`)

        if(response.status >=200 && response.status < 300) {
            setJustLiked(true)
        }
    }

    const unLikePost = async() => {
        const response = await del(`/posts/${props.post.id}/unlike`)

        if(response.status >=200 && response.status < 300) {
            setJustLiked(false)
        }
    }

    useEffect(() => {

        const checkLiked = async() => {
            const response = await get(`/posts/${props.post.id}/like`)
            setIsLiked(response.data.liked)
        }

        checkLiked()
    }, [])


    return (
        <div>
            <div>
                <span className="font-semibold cursor-pointer">{props.post.username}</span>
            </div>
            <div className="font-normal py-2">{props.post.content}</div>

            <div className="font-light flex flex-row space-x-3">
                <div className="cursor-pointer select-none flex flex-row items-center">
                    {isLiked || isJustLiked ?
                        <div onClick={unLikePost}>
                            <Icon path={mdiHeart} color={"red"} size={1}/>
                        </div>
                        :
                        <div onClick={likePost}>
                            <Icon path={mdiHeartOutline} size={1}/>
                        </div>
                    }
                    <span>{props.post.like_count + (isJustLiked ? 1 : 0)}</span>
                </div>
                <div 
                className="cursor-pointer select-none flex flex-row items-center">
                    <Icon path={mdiCommentOutline} size={1}/>
                    <span>{props.post.comment_count.toString()}</span>
                </div>
            </div>
        </div>
    )
}

export default PostContent