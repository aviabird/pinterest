import { Component, OnInit } from '@angular/core';
import { Pin } from '../../models/pin';

@Component({
  selector: 'pin-items',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {
  pins = [
    new Pin({
      userId: 1,
      name: 'Angualar',
      tags: ['ng2', 'angular2'],
      description: 'Angular 2 Blogs',
      imagePath: 'http://1.bp.blogspot.com/-eiRkvPEafsA/Vgk0YsW9K4I/AAAAAAAAA4g/0X2djtLXwzw/s1600/vQv9AxqM.png'
    }),
    new Pin({
      userId: 2,
      name: 'Angualar',
      tags: ['ng2', 'angular2'],
      description: 'Angular 2 Blogs',
      imagePath: 'http://1.bp.blogspot.com/-eiRkvPEafsA/Vgk0YsW9K4I/AAAAAAAAA4g/0X2djtLXwzw/s1600/vQv9AxqM.png'
    }),
    new Pin({
      userId: 3,
      name: 'Angualar',
      tags: ['ng2', 'angular2'],
      description: 'Angular 2 Blogs',
      imagePath: 'https://pictures.abebooks.com/isbn/9781853260155-uk-300.jpg'
    })
    ,new Pin({
      userId: 4,
      name: 'Angualar',
      tags: ['ng2', 'angular2'],
      description: 'Angular 2 Blogs',
      imagePath: 'http://1.bp.blogspot.com/-eiRkvPEafsA/Vgk0YsW9K4I/AAAAAAAAA4g/0X2djtLXwzw/s1600/vQv9AxqM.png'
    })
    ,new Pin({
      userId: 5,
      name: 'Angualar',
      tags: ['ng2', 'angular2'],
      description: 'Angular 2 Blogs',
      imagePath: 'https://pictures.abebooks.com/isbn/9781853260155-uk-300.jpg'
    })
  ];

  constructor() { }

  ngOnInit() {
  }

}
