import { post, del } from "@/scripts/http"
import { Post } from "@/types/Post"
import { mdiHeart, mdiHeartOutline, mdiCommentOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { ThHTMLAttributes, useEffect, useState } from "react"
import { get } from "../scripts/http"
import { PostSheet } from "./PostSheet"

type PostContentProps = {
    post: Post; // The main post to render
    onLikeJustChanged?: (num: number) => void; // Optional callback for like count changes
    withoutSheet?: boolean; // Determines if the comment sheet should be used
    nearbyPosts?: Post[]; // Optional list of nearby posts
  };


function PostContent({post:postProp, onLikeJustChanged, withoutSheet = false, nearbyPosts = []}:PostContentProps) {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [originallyLiked, setOriginallyLiked] = useState<boolean>(false)
    const [timesCommented, setTimesCommented] = useState<number>(0)
    const [likeCountChange, setLikeCountChange] = useState<number>(0)

    const likePost = async() => {
        const response = await post(`/posts/${postProp.id}/like`)

        if(response.status >=200 && response.status < 300) {
            setIsLiked(true)
        }
    }

    const unLikePost = async() => {
        const response = await del(`/posts/${postProp.id}/unlike`)

        if(response.status >=200 && response.status < 300) {
            setIsLiked(false)
        }
    }

    useEffect(() => {
        if(originallyLiked) {
            setLikeCountChange(isLiked ? 0 : -1)
        } else {
            setLikeCountChange(isLiked ? 1 : 0)
        }
    }, [isLiked, originallyLiked])

    useEffect(() => {
        if(onLikeJustChanged)
            onLikeJustChanged(likeCountChange)
    }, [likeCountChange, onLikeJustChanged])

    useEffect(() => {

        const checkLiked = async() => {
            const response = await get(`/posts/${postProp.id}/like`)
            setOriginallyLiked(response.data.liked)
            setIsLiked(response.data.liked)
        }

        checkLiked()
    }, [])
    
    const handleCommentUpdate = (type: "add" | "remove") => {
        setTimesCommented((prev) => (type === "add" ? prev + 1 : Math.max(prev - 1, 0)));
    };

    return (
        <div>
            <div>
                <span className="font-semibold cursor-pointer">{postProp.username}</span>
            </div>
            <div className="font-normal py-2">{postProp.content}</div>

            <div className="font-light flex flex-row space-x-3">
                <div className="cursor-pointer select-none flex flex-row items-center">
                    {isLiked ?
                        <div onClick={unLikePost}>
                            <Icon path={mdiHeart} color={"red"} size={1}/>
                        </div>
                        :
                        <div onClick={likePost}>
                            <Icon path={mdiHeartOutline} size={1}/>
                        </div>
                    }
                    <span>{postProp.like_count + likeCountChange}</span>
                </div>
                {withoutSheet ?(
                    <div className="cursor-pointer select-none flex flex-row items-center comment-button">
                        <Icon path={mdiCommentOutline} size={1} />
                        <span>{(postProp.comment_count + timesCommented).toString()}</span>
                    </div>
                ) : (
                    <PostSheet
                        post={postProp}
                        onComment={() => handleCommentUpdate("add")}
                        onDeleteComment={() => handleCommentUpdate("remove")}
                    >
                        <div className="cursor-pointer select-none flex flex-row items-center comment-button">
                            <Icon path={mdiCommentOutline} size={1} />
                            <span>{(postProp.comment_count + timesCommented).toString()}</span>
                        </div>
                    </PostSheet>
                )}
            </div>
                {/* Render Nearby Posts */}
                {nearbyPosts && nearbyPosts.length > 0 && (
            <div>
                <br/>
                <br/>
                <h4>Nearby Posts:</h4>
                    <br/>
                    <ul>
                    {nearbyPosts.map((nearbyPost) => (
                        <li key={nearbyPost.id} style={{ marginBottom: "10px" }}>
                        <PostContent post={nearbyPost} withoutSheet={true} />
                        <br/>
                        </li>
                     ))}
                    </ul>
            </div>
            )}
        </div>
    );
}

export default PostContent;
