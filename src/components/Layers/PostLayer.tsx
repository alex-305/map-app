import { CircleMarker, LayerGroup, Marker, Popup } from "react-leaflet";
import UserLocation from "../UserLocation";
import PostBox from "../PostBox";
import { useEffect, useState } from "react";
import Post from "../../types/Post";
import L from "leaflet";


function PostLayer() {

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        setPosts([{
            content: "Hello guys, just joined!",
            location: new L.LatLng(25.8,-80.3),
            username: "jeff",
            likeCount: 5
        },
        {
            content: "yo what up",
            location: new L.LatLng(25.6,-80.312),
            username: "tim",
            likeCount: 10
        },
        {
            content: "test",
            location: new L.LatLng(25.732,-80.343),
            username: "pam",
            likeCount: 100
        }])
    }, [])
    
    return (
        <LayerGroup>
            <UserLocation/>
            {posts.map((post, index) => (
                <CircleMarker key={index} center={post.location} radius={post.likeCount}>
                    <Popup>
                        <PostBox post={post}/>
                    </Popup>
                </CircleMarker>
            ))}
        </LayerGroup>
    )
}

export default PostLayer