export class Base {
  public $key: string;
  
  constructor(attributes?) {
    Object.assign(this, attributes);
  }
}