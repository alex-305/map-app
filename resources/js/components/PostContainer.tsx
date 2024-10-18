import { bounds, latLng } from "leaflet"
import PostCircle from "./PostCircle"
import type { Post } from "@/types/Post"
import { createContext, useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import { get } from '../scripts/http'
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
                setPosts(data as Post[] || [])
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

    return (
        <>
            <PostContext.Provider value={{ currentPost, setCurrentPost }}>
                {posts?.length>0 && Array.isArray(posts) && posts.map((post:Post, _) => (
                    <PostCircle key={post.id} post={post}/>
                ))
                }
            </PostContext.Provider>
        </>
    )
}

export default PostContainer
