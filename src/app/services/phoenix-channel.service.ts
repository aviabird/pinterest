import { Injectable } from '@angular/core';
import { Socket } from "phoenix_js"
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { storeFreeze } from 'ngrx-store-freeze';
import { LoadCommentsSuccessAction } from '../actions/comment';

@Injectable()
export class PhoenixChannelService {

  constructor(store: Store<AppState>) {
    let socket = new Socket(
      `${environment.socketEndpoint}/socket`,
      {
        params: {
          token: localStorage.getItem('access_token')
        },
        transport: WebSocket,
        logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
      },
    );
    socket.connect();

    socket.onOpen(ev => console.log("OPEN", ev));
    socket.onError(ev => console.log("ERROR", ev));
    socket.onClose(e => console.log("CLOSE", e));

    var chan = socket.channel("comments:lobby", {});
    chan.join().receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"));
    chan.onError(e => console.log("something went wrong", e));
    chan.onClose(e => console.log("channel closed", e));

    chan.on("user:entered", msg => {
      var username = msg.user || "anonymous";
      console.log("User Entered: ", username);
    })

    chan.on("new:msg", msg => {
      console.log("New Message", msg);
      store.dispatch(new LoadCommentsSuccessAction([msg]));
    })
  }

}
