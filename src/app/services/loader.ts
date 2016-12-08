import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
  constructor() {}
  
  showPreloader(){
    console.log("Loading")
  }

  hidePreloader(){
    console.log("Completed")
  }
}