import { Circle, Popup } from "react-leaflet"
import Post from "@/types/Post"
import Icon from "@mdi/react"
import { mdiHeartOutline, mdiHeart, mdiCommentOutline } from "@mdi/js"
import { useState } from "react"

type FakePostProps = {
    post:Post
}

function PostMarker(props:FakePostProps) {

    const [liked, setLiked] = useState(false)

    return (
        <>
            <Circle color={props.post.color} center={props.post.location} radius={50*props.post.likeCount}>
                <Popup>
                    <div>
                        <div>
                            <span className="font-semibold cursor-pointer"><a>{props.post.username}</a></span>
                            {/* <span className="font-light">{props.post.location}</span> */}
                        </div>
                        <div className="font-normal py-2">{props.post.content}</div>

                        <div className="font-light flex flex-row space-x-3">
                            <div 
                            onClick={()=>setLiked(!liked)} 
                            className="cursor-pointer select-none flex flex-row items-center">
                                {liked ?
                                <Icon path={mdiHeart} color={"red"} size={1}/>
                                :
                                <Icon path={mdiHeartOutline} size={1}/>
                                }
                                <span>{liked ? props.post.likeCount+1 : props.post.likeCount}</span>
                            </div>
                            <div 
                            className="cursor-pointer select-none flex flex-row items-center">
                                <Icon path={mdiCommentOutline} size={1}/>
                                <span>{props.post.replyCount}</span>
                            </div>
                        </div>
                    </div>
                </Popup>    
            </Circle>
        </>
    )
}

export default PostMarker