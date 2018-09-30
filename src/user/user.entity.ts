import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt, IsEmail, IsString } from 'class-validator';

@Entity('users')
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('bigint')
  @IsInt()
  stravaId: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  firstname: string;

  @Column()
  @IsString()
  lastname: string;
}
