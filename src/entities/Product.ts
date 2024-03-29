import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('product')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;
}