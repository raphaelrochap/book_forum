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
}