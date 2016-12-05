import { Base } from './base';

export class Pin extends Base{
  name: string;
  image_url: string;
  url: string;
  tags: Array<string>;
  user_id: string;
  description: string;
}