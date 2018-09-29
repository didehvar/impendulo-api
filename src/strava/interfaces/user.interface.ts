import Shared from './shared.interface';
import CLub from './club.interface';
import Gear from './gear.interface';

export default interface User extends Shared {
  username: string | null;
  email: string;
  premium: boolean;

  firstname: string;
  lastname: string;
  sex: 'M' | 'F' | null;

  athlete_type: 0 | 1; // 0 cycling, 1 running
  measurement_preference: 'meters' | 'feet';

  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;

  created_at: string;
  updated_at: string;

  clubs: CLub[];
  bikes: Gear[];
  shoes: Gear[];

  summit: boolean;
  badge_type_id: number;
  friend: null;
  follower: null;
  date_preference: string;
  ftp: null;
}
