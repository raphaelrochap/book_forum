export type Post = {
    id?: number;
    user_id?: User;
    title?: string;   
    description?: string;
    image_url?: string;
    views?: number;
    likes?: number;
    dislikes?: number;
    edition_history?: object[];
    liked_by?: number[];    
    disliked_by?: number[];
}

export type User = {    
    id?: number;
    name?: string;
    email?: string;
    password?: string;    
}

export type Comment = {
    id?: number;
    user_id?: User | number;
    post_id?: Post | number;
    description: string;    
    removed?: boolean;
}