export interface Post {
    id: number;
    user_id: number;
    title: string;   
    description: string;
    image_url: string;
    views: number;
    likes: number;
    dislikes: number;
    edition_history: object[];
    liked_by: number[];
    disliked_by: number[];
}