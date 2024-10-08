
export type Post = {
    content:string
    username:string
    latitude:number
    longitude:number
    likeCount:number
    replyCount:number
    color:string
    id:number
}

export type NewPost = {
    content:string
    latitude:number
    longitude:number
    color:string
}