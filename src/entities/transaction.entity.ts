import { Length } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";


export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

@Entity()
export class Transaction extends Model {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @Length(3, 100)
    name!: string;

    @Column()
    @Length(3, 100)
    description!: string;

    @Column()
    amount!: number;

    @Column()
    type!: TransactionType;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id'})
    user!: User;
}