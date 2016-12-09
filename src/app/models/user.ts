import { Base } from './base';

export class User extends Base {
  name: string;
  avatar: string;
  email: string;
  provider: string;
}