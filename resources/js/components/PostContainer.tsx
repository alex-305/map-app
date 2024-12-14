import { bounds, latLng } from "leaflet"
import PostCircle from "./PostCircle"
import type { Post } from "@/types/Post"
import { createContext, useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import { get, post } from '../scripts/http'
import { ErrorToast } from "@/scripts/toast"
import { Comment } from "@/types/Comment"

export const PostContext = createContext<{
    currentPost?: Post,
    setCurrentPost: React.Dispatch<React.SetStateAction<Post>>
} | undefined>(undefined)

export function PostContainer() {

    const [posts, setPosts] = useState<Post[] | []>([])
    const [currentPost, setCurrentPost] = useState<Post>(null)

    const map = useMap()

    useEffect(() => {

        if(!map) return

        const getBounds = async() => {
            const bounds = map.getBounds()
            const minLat = bounds.getSouthWest().lat
            const minLng = bounds.getSouthWest().lng
            const maxLat = bounds.getNorthEast().lat
            const maxLng = bounds.getNorthEast().lng


            const {data, error} = await get(`/posts?min_lat=${minLat}&min_lng=${minLng}&max_lat=${maxLat}&max_lng=${maxLng}`)


            if(!error) {
                setPosts(prevPosts => {
                    const newPosts = data as Post[] || [];
                    
                    const allPosts = [...prevPosts, ...newPosts];
                    const uniquePosts = allPosts.filter((post, index, self) => 
                        index === self.findIndex(p => p.id === post.id)
                    );
                    
                    return uniquePosts;
                });
            } else {
                ErrorToast(error.message, error.status)
            }
            
        }

        getBounds()

        const handleMapMove = () => {
            getBounds()
        }

        map.on('moveend', handleMapMove)

        return () => {
            map.off('moveend', handleMapMove)
        }

    }, [map])

    const getRadius = (post: Post) => {
        return 50*post.like_count || 25
    };

    

    const getNearbyPosts = (post: Post, ) => {
        var radius = 50 * post.like_count || 25
        var threshold = radius / 100000
        return posts.filter(
          (p) =>
            p.id !== post.id &&
            Math.sqrt(
              Math.pow(post.latitude - p.latitude, 2) +
                Math.pow(post.longitude - p.longitude, 2)
            ) < threshold
        );
      }; 

      return (
        <>
            <PostContext.Provider value={{ currentPost, setCurrentPost }}>
                {posts?.length>0 && Array.isArray(posts) && posts.map((post:Post, _) => (
                    <PostCircle key={post.id} post={post} nearbyPosts={getNearbyPosts(post)}/>
                ))
                }
            </PostContext.Provider>
        </>
    )
}

export default PostContainer