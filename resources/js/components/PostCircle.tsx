import { Circle, Popup } from "react-leaflet"
import type { Post } from "@/types/Post"
import PostContent from "./PostContent"
import { Radius } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type PostMarkerProps = {
    post:Post
}

function PostMarker(props:PostMarkerProps) {
    
    
    const getRadius = (likeCount: number) => {
        return 50*likeCount || 25
    }
    
    const [circleRadius, setCircleRadius] = useState(getRadius(props.post.like_count))
    
    const onLikeJustChanged = (change:number) => {
        setCircleRadius(getRadius(props.post.like_count + change))
        console.log(getRadius(props.post.like_count + change))
    }

    return (
        <>
            <Circle color={`#${props.post.color}`} center={[props.post.latitude, props.post.longitude]} radius={circleRadius}>
                <Popup>
                    <PostContent onLikeJustChanged={onLikeJustChanged} post={props.post}/>
                </Popup>    
            </Circle>
        </>
    )
}

export default PostMarker