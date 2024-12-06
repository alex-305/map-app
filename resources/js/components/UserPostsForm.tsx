import { useState, useEffect } from "react"
import { useMap } from "react-leaflet"
import { useUserInfo } from "@/components/UserInfoContext"
import { mdiHeart, mdiHeartOutline, mdiCommentOutline } from "@mdi/js"
import PostContent from "./PostContent"
import Icon from "@mdi/react"
import { z } from "zod" 
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuth from "@/scripts/useAuth"


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
            <h2><strong>{user.username ?? "Unknown"}</strong>'s Posts</h2>
            <div className="max-h-96 overflow-y-auto">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} 
                            onClick={() => handlePostClick(post)} 
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 post-item text-center border-b dark:border-zinc-50 pb-8 pt-8"
                        >
                            {post.content}
                            <br />
                            <span className="inline-flex items-center mr-4">
                                <Icon path={mdiHeartOutline} size={1} />
                                {post.like_count}
                            </span>
                            <span className="inline-flex items-center mr-4">
                                <Icon path={mdiCommentOutline} size={1} />
                                {post.comment_count}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No posts available.</p>
                )}
            </div>
        </div>
    );
}