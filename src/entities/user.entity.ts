import { Entity, Column, Index, BeforeInsert, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';
import {
    IsEmail,
    Length,
} from "class-validator"

@Entity('users')
export class User extends Model {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @Length(3, 100)
    name!: string;

    @Index('email_index')
    @IsEmail()
    @Column({
        unique: true,
    })
    email!: string;

    @Column()
    password!: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    toJSON() {
        return { ...this, password: undefined, verified: undefined };
    }
}
