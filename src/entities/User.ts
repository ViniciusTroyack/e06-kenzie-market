import bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, ManyToOne, JoinTable, UpdateDateColumn } from 'typeorm';

import Product from './Product';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column()
    isAdmin!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedOn!: Date;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}