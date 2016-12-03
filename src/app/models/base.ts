export class Base {
  public $key: string;
  public createdAt: string;
  public updatedAt: string;
  
  constructor(attributes?) {
    Object.assign(this, attributes);
    this.addTimeStamp(attributes)
  }

  get id():string {
    return this.$key
  }

  addTimeStamp(attributes) {
    if (!attributes){return}
    
    let today = new Date().toUTCString();

    if (!attributes.createdAt) {
      this.createdAt = today;
    }
    
    if (!attributes.updatedAt) {
      this.updatedAt = today;
    }
  }
}