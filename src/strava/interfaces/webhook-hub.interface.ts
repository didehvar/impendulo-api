export interface WebhookHub {
  'hub.mode': 'subscribe';
  'hub.verify_token': string;
  'hub.challenge': string;
}
