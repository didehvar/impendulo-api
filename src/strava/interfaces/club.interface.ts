import Shared from './shared.interface';

export default interface CLub extends Shared {
  url: string;
  sport_type: 'cycling' | 'running' | 'triathlon' | 'other';
  private: boolean;
  member_count: number;

  cover_photo: string | null;
  cover_photo_small: string | null;

  featured: boolean;
  verified: boolean;

  membership: 'member';
  admin: boolean;
  owner: boolean;
}
