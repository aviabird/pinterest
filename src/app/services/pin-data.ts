import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as fromPins from '../reducers/pins';
import { Pin } from '../models/pin';
import { Comment } from '../models/comment';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { ApiUrl } from '../app.api-url';

@Injectable()
export class PinDataService {
  PinState: Observable<fromPins.State>;
  pinsCount: number = 0;
  private headers = new Headers();

  constructor(
    public db: AngularFireDatabase,
    public http: Http
  ) {
    this.headers.append('Authorization', `Basic ${environment.basic_auth_token}`);
  };

  getPins() {
    let options = new RequestOptions({ headers: this.headers });

    return this
      .http.get(ApiUrl.pins_path, options)
      .map(res => res.json().data)
      .map(pins => pins.map(pin => new Pin(pin)))

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
    return this.db.list('comments')
      .map(comments => {
        return comments
          .map(comment => new Comment(comment))
          .filter((comment) => comment.pinId == pinId)
      })
  }

  addComment(comment: Comment) {
    this.db.list('comments').push(new Comment(comment));
  }

  deleteComment(id) {
    this.db.list('comments').remove(id)
  }
}