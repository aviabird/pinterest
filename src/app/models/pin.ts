import { Base } from './base';
import { User } from './user';

export class Pin extends Base{
  name: string;
  image_url: string;
  url: string;
  tags: string;
  user_id: string;
  description: string;
  user: User;
}