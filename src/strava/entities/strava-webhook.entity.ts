import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsEnum, IsJSON, IsDate } from 'class-validator';
import {
  WebhookAspectType,
  WebhookObjectType,
} from '../interfaces/webhook.interface';

@Entity('strava_webhooks')
export class StravaWebhook {
  constructor(partial?: Partial<StravaWebhook>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: WebhookObjectType })
  @IsEnum(WebhookObjectType)
  objectType: string;

  @Column()
  @IsNumber()
  objectId: number;

  @Column('enum', { enum: WebhookAspectType })
  @IsEnum(WebhookAspectType)
  aspectType: string;

  @Column('json')
  @IsJSON()
  updates: object;

  @Column()
  @IsNumber()
  ownerId: number;

  @Column()
  @IsNumber()
  subscriptionId: number;

  @Column()
  @IsDate()
  eventTime: Date;
}
