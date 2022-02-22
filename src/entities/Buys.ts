// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, JoinColumn, JoinTable} from 'typeorm';

// import Product from './Product';
// import User from "./User"

// @Entity('users')
// export default class Buys {
//     @PrimaryGeneratedColumn('uuid')
//     id!: string;

//     @ManyToOne(()=> User)
//     @JoinColumn({
//         name: "user_id"
//     })
//     user!: User;

//     @Column()
//     user_id!: string

//     @ManyToMany(() => Product)
//     @JoinTable()
//     product!: Product[];

//     @CreateDateColumn()
//     createdAt!: Date;

//     @Column()
//     finished!: Boolean;
// }