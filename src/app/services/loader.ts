import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
  showPreloader(){
    console.log("Loading Data");
  }

  hidePreloader(){
    console.log("Data Loading Completed")
  }
}