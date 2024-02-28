import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  DONT_WANT_TO_DISCLOSE = 'dont_want_to_disclose',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 10, unique: true })
  contactNumber: string;

  @Column({ length: 70 })
  address: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.DONT_WANT_TO_DISCLOSE,
  })
  gender: Gender;
}
