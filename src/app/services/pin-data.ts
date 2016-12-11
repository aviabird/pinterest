import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as fromPins from '../reducers/pins';
import { Pin } from '../models/pin';
import { Comment } from '../models/comment';
import { environment } from '../../environments/environment';
import { ApiUrl } from '../app.api-url';
import { HttpService } from './http';

@Injectable()
export class PinDataService {
  PinState: Observable<fromPins.State>;
  pinsOffset: number = 0;

  constructor(
    public db: AngularFireDatabase,
    public http: HttpService
  ) {
  };

  getPins() {
    return this
      .http.get(`pins?limit=20&offset=${this.pinsOffset}`)
      .map(res => res.json().data)
      .map(pins => {
        this.pinsOffset += pins.length;
        return pins.map(pin => new Pin(pin));
      })

    // this.pinsCount += 20
    // return this.db
    //   .list('pins/', {
    //     query: {
    //       limitToFirst: this.pinsCount,
    //     }
    //   })
    //   .map(pins => pins.map(pin => new Pin(pin)));
  }

  getComments(pinId: string) {
    return this
      .http.get(`pins/${pinId}`)
      .map(res => res.json().data.comments)
      .map(comments => comments)
  }

  addComment(comment: Comment) {
    return this
      .http.post('comments', {comment: comment})
      .map(res => res.json().data);
  }

  deleteComment(id) {
    return this
      .http.delete(`comments/${id}`)
      .map(() => id);
  }
}