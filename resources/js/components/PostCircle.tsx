import { Circle, Popup } from "react-leaflet"
import type { Post } from "@/types/Post"
import PostContent from "./PostContent"

type PostMarkerProps = {
    post:Post
}

function PostMarker(props:PostMarkerProps) {

    return (
        <>
            <Circle color={props.post.color} center={[props.post.latitude, props.post.longitude]} radius={50*props.post.like_count || 300}>
                <Popup>
                    <PostContent post={props.post}/>
                </Popup>    
            </Circle>
        </>
    )
}

export default PostMarker