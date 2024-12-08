import { useState, useEffect } from "react"
import { useMap } from "react-leaflet"
import { useUserInfo } from "@/components/UserInfoContext"
import { mdiHeartOutline, mdiCommentOutline, mdiHeart, mdiComment } from "@mdi/js"
import Icon from "@mdi/react"
import { formatDate } from "@/scripts/formatDate"
import { Post } from "@/types/Post"
import PostContent from "./PostContent"
import { mdiTrashCanOutline } from "@mdi/js"; // import trash icon

export default function UserPostsForm({ onView }) {
    const { user } = useUserInfo();
    const [posts, setPosts] = useState([]);
    const map = useMap();

    useEffect(() =>{
        async function fetchPosts(){
            const response = await fetch(`/posts/user/${user.id}`);
            const userPosts = await response.json();
            setPosts(userPosts);
        }

        if(user && user.id){
            fetchPosts();
        }
    }, [user]);

    const handlePostClick = (post) => {
        if(post.latitude && post.longitude){
            map.flyTo([post.latitude, post.longitude], 18, { duration: 1 });
            onView();
        } else {
            console.warn("Post does not have location information");
        }
    };

    const handleDelete = async (postId) =>{
        if(confirm("Are you sure you want to delete this post?")) {

            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // get CSRF token
    
            const response = await fetch(`/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken, // CSRF token 
                },
            });
    
            if(response.ok){
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
            }else {
                console.error("Error coudnt delete the post");
            }
        }
    };
    

    return (
        <div className="space-y-4 dark:text-zinc-50">
            <div className="max-h-96 overflow-y-auto">
                {posts.length > 0 ? (
                    posts.map((post) =>(
                        <div
                            key={post.id}
                            className="relative cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 border-b dark:border-zinc-50 pb-3 pt-3 rounded pl-5"
                            style={{ backgroundColor: `#${post.color}27` }}
                        >
                            <div className="flex items-center justify-between">
                                <div
                                    onClick={() => handlePostClick(post)}
                                    className="flex-1"
                                >
                                    <span className="inline-flex text-sm text-stone-500">
                                        {formatDate(post.created_at)}
                                    </span>
                                    <PostContent post={post} withoutSheet />
                                </div>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Post"
                                >
                                    <Icon path={mdiTrashCanOutline} size={1} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No posts available.</p>
                )}
            </div>
        </div>
    );
}
