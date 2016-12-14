export class Base {
  public id:string;

  constructor(attributes?) {
    if(attributes){
      let keys = Object.keys(attributes)
      if (keys.length) {
        keys.forEach(el => {
          this[el] = attributes[el];
        })
      }
    }
  }
}