import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Pinterest';

  constructor() { }

  ngOnInit() {
  }

  login(provider: string) {
  }
  
  logout() {
  }

}
