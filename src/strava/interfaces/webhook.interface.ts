interface WebhookUpdate {
  title: string;
  type: string;
  private: boolean;
}

interface WebhookDeauthorize {
  authorized: false;
}

export enum WebhookObjectType {
  Activity = 'activity',
  Athlete = 'athlete',
}

export enum WebhookAspectType {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export interface Webhook {
  object_type: WebhookObjectType;
  object_id: number; // activity or athlete id
  aspect_type: WebhookAspectType;
  updates: WebhookUpdate | WebhookDeauthorize | undefined;
  owner_id: number; // athlete id
  subscription_id: number;
  event_time: number;
}
