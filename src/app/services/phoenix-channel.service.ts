import { Injectable } from '@angular/core';
import { Socket } from "phoenix_js"
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState, getUserAuthStatus, getAuthUser } from '../reducers/index';
import { storeFreeze } from 'ngrx-store-freeze';
import { LoadCommentsSuccessAction, DeleteCommentSuccessAction } from '../actions/comment';
import { User } from '../models/user';

@Injectable()
export class PhoenixChannelService {
  private socket: any;
  private user: User;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(getUserAuthStatus).subscribe(
      authStatus => {
        if (!authStatus) {
          if(this.socket) {
            this.socket.disconnect();
          }
        }
        else {
          // Incase Socket is not present
          if(!this.socket) {
            this.socket = this._socket();
            this.store.select(getAuthUser).subscribe(
              user => this.user = user
            );
          }

          this.socket.connect();

          this.socket.onOpen(ev => console.log("OPEN", ev));
          this.socket.onError(ev => console.log("ERROR", ev));
          this.socket.onClose(e => console.log("CLOSE", e));

          this.initCommentChannel();
        }
      }
    );
  }

  private _socket(){
    return new Socket(
      `${environment.socketEndpoint}/socket`,
      {
        params: {
          token: localStorage.getItem('access_token')
        },
        transport: WebSocket,
        logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
      },
    );
  }

  private initCommentChannel() {
    var chan = this.socket.channel("comments:lobby", {});
    chan.join().receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"));
    chan.onError(e => console.log("something went wrong", e));
    chan.onClose(e => console.log("channel closed", e));

    // chan.on("user:entered", msg => {
    //   var username = msg.user || "anonymous";
    //   console.log("User Entered: ", username);
    // })

    chan.on("new:msg", msg => {
      if (this.user.id != msg.user_id) {
        this.store.dispatch(new LoadCommentsSuccessAction([msg]));
      }
    })

    chan.on("delete:msg", msg => {
      if (this.user.id != msg.user_id) {
        this.store.dispatch(new DeleteCommentSuccessAction(msg.id));
      }
    })
  }

}
