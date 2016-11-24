export class Base {
  public $key;

  constructor(attributes?) {
    Object.assign(this, attributes);
  }

  id() {
    this.$key;
  }
}