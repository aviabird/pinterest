import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Pin } from '../../models/pin';

@Component({
  selector: 'pin-items',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinsComponent implements OnInit {
  pins = [];

  constructor() { }

  ngOnInit() {
    let image_urls = [
      'https://pictures.abebooks.com/isbn/9781853260155-uk-300.jpg',
      'http://1.bp.blogspot.com/-eiRkvPEafsA/Vgk0YsW9K4I/AAAAAAAAA4g/0X2djtLXwzw/s1600/vQv9AxqM.png',
      'https://cdn.auth0.com/blog/angular2-electron/angular2-electron-logo.png',
      'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/063/thumb/EGH_A2_Router.png?1473527151',
      'http://www.angulartypescript.com/wp-content/uploads/2016/03/angular-2-sass-home.png',
      'https://hadesblogcontent.blob.core.windows.net/media/2016/03/asp-net-angular2-300x176.jpg'
    ]
    for(let i = 0; i < 20; i++) {
      let rand = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
      this.pins.push(
        new Pin({
          userId: i,
          name: 'Angualar',
          tags: ['ng2', 'angular2'],
          description: 'Angular 2 Blogs',
          imagePath: image_urls[rand]
        })
      )
    }
  }

}
