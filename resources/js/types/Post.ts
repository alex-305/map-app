
export type Post = {
    content:string
    author_id:number
    username:string
    latitude:number
    longitude:number
    like_count:number
    comment_count:number
    color:string
    id:number
    updated_at: string
    created_at: string
}

export type NewPost = {
    content:string
    latitude:number
    longitude:number
    color:string
}