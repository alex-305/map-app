import { LatLng } from "leaflet"

type Post = {
    content:string
    username:string
    location:LatLng
    likeCount:number
}

export default Post