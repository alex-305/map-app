// import { useMapEvent } from "react-leaflet";

import Post from "../types/Post"

export type PostBoxProps = {
    post:Post
}

function PostBox(props:PostBoxProps) {

    return (
        <>
        {props.post.content}
        </>
    )
}

export default PostBox