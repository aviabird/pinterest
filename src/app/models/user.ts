import { Base } from './base';

export class User extends Base{
  displayName:  string;
  photoURL:     string;
  email:        string;
  provider:     string;
}