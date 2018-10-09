import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDateString, IsNumber, IsUrl } from 'class-validator';

@Entity('strava_subscriptions')
export class StravaSubscription {
  constructor(partial?: Partial<StravaSubscription>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  stravaId: number;

  @Column()
  @IsNumber()
  applicationId: number;

  @Column()
  @IsUrl()
  callbackUrl: string;

  @Column()
  @IsDateString()
  createdAt: Date;

  @Column()
  @IsDateString()
  updatedAt: Date;
}
