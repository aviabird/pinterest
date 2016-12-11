export class Base {
  public id:string;
  
  constructor(attributes?) {
    Object.assign(this, attributes);
  }

}