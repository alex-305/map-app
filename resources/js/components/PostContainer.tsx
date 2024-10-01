import { latLng } from "leaflet"
import PostMarker from "./PostMarker"
import type Post from "@/types/Post"

function PostContainer() {

    const fakePosts:Post[] = [{
        content: "We live where you vacation 😝",
        location: latLng([25.8, -80.3]),
        likeCount: 458,
        replyCount: 32,
        username: "John",
        color: "blue",
        id: 0
    },
    {
        content: "What's up party people? Where can I find a decent IPA around here?",
        location: latLng([30.2, -85.1]),
        likeCount: 58,
        replyCount: 4,
        username: "Tim",
        color: "red",
        id: 1,
    },
    {
        content: "EAST COAST the BEAST COST try and prove me wrong 🤷‍♂️👑",
        location: latLng([40.728, -73.992]),
        likeCount: 4504,
        replyCount: 421,
        username: "Raul",
        color: "blue",
        id: 2,
    }
]

    return (
        <>
            {fakePosts.map((post:Post, _) => (
                <PostMarker key={post.id} post={post}/>
            ))
            }
        </>
    )
}

export default PostContainer