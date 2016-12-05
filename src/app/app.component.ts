import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'pin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
    $(document).on('closed.zf.reveal', '[data-reveal]', () => {
      this.router.navigate(['../'])
      console.log('modal closed')
    });
  }

}
