
export type Post = {
    content:string
    username:string
    latitude:number
    longitude:number
    like_count:number
    comment_count:number
    color:string
    id:number
}

export type NewPost = {
    content:string
    latitude:number
    longitude:number
    color:string
}

export type Comment = {
    author_id: number
    content: string
    created_at: string
    id: number
    post_id: number
    updated_at: string
}
