import { Base } from './base';

export class Pin extends Base{
  name: string;
  imagePath: string;
  url: string;
  tags: Array<string>;
  userId: string;
}