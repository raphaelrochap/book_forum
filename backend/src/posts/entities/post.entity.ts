import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user_id: UserEntity;

    @Column({ length: 100, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    description: string;
    
    @Column({ length: 200, nullable: true })
    image_url: string;

    @Column({ default: 0, nullable: true })
    views: number;

    @Column({ default: 0, nullable: true })
    likes: number;

    @Column({ default: 0, nullable: true })
    dislikes: number;

    @Column({ type: 'json', nullable: true, default: '[]' })
    edition_history: object[];
    
    @Column({ type: 'json', nullable: true, default: '[]' })
    liked_by: number[];

    @Column({ type: 'json', nullable: true, default: '[]' })
    disliked_by: number[];
}