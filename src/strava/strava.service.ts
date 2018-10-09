import {
  Injectable,
  HttpService,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Profile } from './interfaces/profile.interface';
import { User } from '../user/user.entity';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { WebhookSubscription } from './interfaces/webhook-subscription.interface';
import { Repository } from 'typeorm';
import { StravaSubscription } from './entities/strava-subscription.entity';
import { WebhookHub } from './interfaces/webhook-hub.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Webhook } from './interfaces/webhook.interface';
import { StravaWebhook } from './entities/strava-webhook.entity';

@Injectable()
export class StravaService {
  constructor(
    private readonly usersService: UserService,
    private readonly httpService: HttpService,
    @InjectRepository(StravaSubscription)
    private readonly subscriptionRepository: Repository<StravaSubscription>,
    @InjectRepository(StravaWebhook)
    private readonly webhookRepository: Repository<StravaWebhook>,
  ) {}

  async createUser(accessToken: string, profile: Profile): Promise<User> {
    return await this.usersService.create(
      new User({
        stravaId: profile.id,
        email: profile._json.email,
        firstname: profile.name.first,
        lastname: profile.name.last,
      }),
    );
  }

  async validateUser(accessToken: string, profile: Profile): Promise<User> {
    const user = await this.usersService.findByStravaId(profile.id);

    if (!user) {
      return await this.createUser(accessToken, profile);
    }

    return user;
  }

  saveWebhookSubscription(data: WebhookSubscription) {
    const subscription = new StravaSubscription({
      stravaId: data.id,
      applicationId: data.application_id,
      callbackUrl: data.callback_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    });
    return this.subscriptionRepository.save(subscription);
  }

  async subscribeToWebhooks(webhookUrl) {
    try {
      const data: WebhookSubscription = await this.httpService
        .post(
          'https://api.strava.com/api/v3/push_subscriptions',
          stringify({
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            callback_url: `${process.env.BASE_URL}/${webhookUrl}`,
            verify_token: process.env.STRAVA_VERIFY_TOKEN,
          }),
        )
        .pipe(map(response => response.data))
        .toPromise();

      await this.saveWebhookSubscription(data);
    } catch (ex) {
      throw new BadRequestException(ex.message);
    }
  }

  verifyWebhook(data: WebhookHub): object {
    if (data['hub.mode'] !== 'subscribe') {
      throw new BadRequestException();
    }

    if (data['hub.verify_token'] !== process.env.STRAVA_VERIFY_TOKEN) {
      throw new UnauthorizedException();
    }

    return { 'hub.challenge': data['hub.challenge'] };
  }

  receiveWebhook(data: Webhook) {
    const webhook = new StravaWebhook({
      objectType: data.object_type,
      objectId: data.object_id,
      aspectType: data.aspect_type,
      updates: data.updates,
      ownerId: data.owner_id,
      subscriptionId: data.subscription_id,
      eventTime: new Date(data.event_time * 1000),
    });
    return this.webhookRepository.save(webhook);
  }
}
