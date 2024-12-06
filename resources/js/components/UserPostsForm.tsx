import { useState, useEffect } from "react"
import { useMap } from "react-leaflet"
import { useUserInfo } from "@/components/UserInfoContext"
import { mdiHeartOutline, mdiCommentOutline, mdiHeart, mdiComment } from "@mdi/js"
import Icon from "@mdi/react"
import { formatDate } from "@/scripts/formatDate"
import { Post } from "@/types/Post"
import PostContent from "./PostContent"


export default function UserPostsForm({ onView }) {
    const { user } = useUserInfo();
    const [posts, setPosts] = useState([]);
    const map = useMap();

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`/posts/user/${user.id}`);
            const userPosts = await response.json();
            setPosts(userPosts);
        }
        if (user && user.id) {
            fetchPosts();
        }
    }, [user]);

    const handlePostClick = (post) => {
        if (post.latitude && post.longitude) {
            // Fly to the post's location with a zoom level of 18
            map.flyTo([post.latitude, post.longitude], 18, {
                duration: 1 // Animation duration in seconds
            });
            onView();

            // Optional: You might want to open a popup or highlight the specific post
            // This would require additional logic in your map implementation
        } else {
            console.log(post.longitude + "   " + post.latitude)
            console.warn("Post does not have location information");
        }
    };

    return (
        <div className="space-y-4 dark:text-zinc-50">
            <div className="max-h-96 overflow-y-auto">
                {posts.length > 0 ? (
                    posts.map((post:Post) => (
                        <div key={post.id} 
                            onClick={() => handlePostClick(post)} 
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 border-b dark:border-zinc-50 pb-3 pt-3 rounded pl-5"
                            style={{backgroundColor: `#${post.color}27`}}>
                            <span className="inline-flex text-sm text-stone-500">
                            {formatDate(post.created_at)}
                            </span>
                            <PostContent post={post} withoutSheet/>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No posts available.</p>
                )}
            </div>
        </div>
    );
}