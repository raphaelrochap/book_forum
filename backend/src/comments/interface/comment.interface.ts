export interface Comment {    
    id: number;
    user_id: number;
    post_id: number;
    description: string;
    removed: boolean;
}