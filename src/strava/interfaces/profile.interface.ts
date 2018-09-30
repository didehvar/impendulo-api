import { User } from './user.interface';

export interface Profile {
  provider: string;
  id: number;

  avatar: string;
  displayName: string;
  name: {
    first: string;
    last: string;
  };

  _json: User;
}
