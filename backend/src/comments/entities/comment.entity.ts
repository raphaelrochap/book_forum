import { PostEntity } from "src/posts/entities/post.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user_id: UserEntity;

    @ManyToOne(() => PostEntity)
    @JoinColumn()
    post_id: PostEntity;

    @Column({ type: 'text', nullable: false })
    description: string;    

    @Column({ type: 'boolean', nullable: true, default: false })
    removed: boolean;
}