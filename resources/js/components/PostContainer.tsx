import { bounds, latLng } from "leaflet"
import PostCircle from "./PostCircle"
import type { Post } from "@/types/Post"
import { useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import { get } from '../scripts/http'

function PostContainer() {

    const [posts, setPosts] = useState<Post[] | []>([])

    const map = useMap()

    useEffect(() => {

        if(!map) return

        const getBounds = async() => {
            const bounds = map.getBounds()
            const minLat = bounds.getSouthWest().lat
            const minLng = bounds.getSouthWest().lng
            const maxLat = bounds.getNorthEast().lat
            const maxLng = bounds.getNorthEast().lng


            const response = await get(`/posts?min_lat=${minLat}&min_lng=${minLng}&max_lat=${maxLat}&max_lng=${maxLng}`)

            setPosts(response.data as Post[] || [])
            
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
            {posts.map((post:Post, _) => (
                <PostCircle key={post.id} post={post}/>
            ))
            }
        </>
    )
}

export default PostContainer