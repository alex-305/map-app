import { LatLng } from "leaflet"

type Post = {
    content:string
    username:string
    location:LatLng
    likeCount:number
    replyCount:number
    color:string
    id:number
}

export default Post