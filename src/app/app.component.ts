import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getProgressStatus, getNotifications } from './reducers/index';
import { ShowProgressAction, CompleteProgressAction } from './actions/notification';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

declare var $:any;

@Component({
  selector: 'pin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public toasterconfig : ToasterConfig = new ToasterConfig({
    preventDuplicates: true,
    positionClass: 'toast-bottom-right'
  });

  constructor(
    public router: Router,
    private store: Store<AppState>,
    private slimLoadingBarService: SlimLoadingBarService,
    private toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.afterModalClosed();
    this.subscribeToProgress();
    this.subscribeToNotifications();
  }

  afterModalClosed() {
    $(document).on('closed.zf.reveal', '[data-reveal]', () => {
      this.router.navigate(['../'])
    });
  }

  subscribeToProgress() {
    this.store.select(getProgressStatus).subscribe(
      (status) => {
        if(status == true){
          this.slimLoadingBarService.start();
        }
        else {
          this.slimLoadingBarService.complete();
        }
      }
    );
  }

  private subscribeToNotifications() {
    this.store.select(getNotifications).subscribe(
      notifications => {
        notifications.forEach(toastr => {
          this.toasterService.pop(toastr.type, toastr.title, toastr.body);
        });
      }
    );
  }

}
